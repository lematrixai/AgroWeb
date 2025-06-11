"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  setPersistence,
  browserLocalPersistence,
  fetchSignInMethodsForEmail
} from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { toast } from "sonner"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { createSessionCookie, deleteSessionCookie } from "@/lib/action/action.auth"

interface AuthContextType {
  user: User | null
  signUp: (email: string, password: string, userData: any) => Promise<any>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const getAuthErrorMessage = (error: any): string => {
  switch (error.code) {
    case 'auth/invalid-credential':
      return 'Invalid email or password'
    case 'auth/user-not-found':
      return 'No account found with this email'
    case 'auth/wrong-password':
      return 'Incorrect password'
    case 'auth/email-already-in-use':
      return 'An account already exists with this email'
    case 'auth/weak-password':
      return 'Password should be at least 6 characters'
    case 'auth/invalid-email':
      return 'Please enter a valid email address'
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection'
    default:
      return error.message || 'An error occurred during authentication'
  }
}

const setUserCookie = async (user: User) => {
  try {
    const idToken = await user.getIdToken()
    const result = await createSessionCookie(idToken)
    if (!result.success) {
      throw new Error(result.error || 'Failed to set session cookie')
    }
  } catch (error) {
    console.error('Error setting session cookie:', error)
    throw error
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Enable persistence
        await setPersistence(auth, browserLocalPersistence)
        console.log('Firebase persistence enabled');
        
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          try {
            if (user) {
              console.log('User authenticated:', user.uid);
              // Set session cookie
              await setUserCookie(user)
            } else {
              console.log('User signed out');
              // Clear session cookie when user signs out
              await deleteSessionCookie()
            }
            setUser(user)
          } catch (error) {
            console.error('Error in auth state change:', error);
          } finally {
            setLoading(false)
          }
        })

        return () => unsubscribe()
      } catch (error) {
        console.error("Auth initialization error:", error)
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      console.log('Starting signup process for:', email);
      
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Firebase Auth user created:', userCredential.user.uid);
      
      try {
        // Store additional user data in Firestore
        const userDoc = {
          uid: userCredential.user.uid,
          email: email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role || 'user',
          createdAt: new Date().toISOString(),
          isAuthorized: true,
        };

        console.log('Attempting to save user data to Firestore:', userDoc);

        // Save to Firestore with retry
        let retryCount = 0;
        const maxRetries = 3;
        let lastError = null;
        
        while (retryCount < maxRetries) {
          try {
            await setDoc(doc(db, 'users', userCredential.user.uid), userDoc);
            console.log('User data saved successfully to Firestore');
            break; // Success, exit the retry loop
          } catch (error: any) {
            lastError = error;
            console.error(`Firestore save attempt ${retryCount + 1} failed:`, error);
            retryCount++;
            if (retryCount === maxRetries) {
              throw new Error(`Failed to save user data after ${maxRetries} attempts: ${error.message}`);
            }
            // Wait before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount)));
          }
        }
        
        return userCredential;
      } catch (error: any) {
        console.error('Firestore error:', error);
        // If Firestore fails, delete the auth user
        try {
          await userCredential.user.delete();
          console.log('Auth user deleted after Firestore failure');
        } catch (deleteError) {
          console.error('Failed to delete auth user:', deleteError);
        }
        throw new Error(`Failed to save user data: ${error.message}`);
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Starting sign in process...')
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log('Firebase auth successful:', userCredential.user.uid)
      
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
      const userData = userDoc.data()
      console.log('User data from Firestore:', userData)

      // Check if user is authorized
      if (!userData?.isAuthorized) {
        console.log('User is not authorized')
        toast.error("Your account is not authorized. Please contact support.")
        await firebaseSignOut(auth)
        return
      }

      // Create session cookie
      const idToken = await userCredential.user.getIdToken()
      console.log('Got Firebase ID token')
      
      const sessionResult = await createSessionCookie(idToken)
      console.log('Session creation result:', sessionResult)
      
      if (!sessionResult.success) {
        throw new Error('Failed to create session')
      }

      // Set user state
      setUser(userCredential.user)
      console.log('User state updated')
    
      
      toast.success("Signed in successfully!")
    } catch (error: any) {
      console.error('Sign in error:', error)
      const errorMessage = getAuthErrorMessage(error)
      toast.error(errorMessage)
      throw error
    }
  }

  const signOut = async () => {
    try {
      // Sign out from Firebase
      await firebaseSignOut(auth)
      
      // Delete session cookie
      await deleteSessionCookie()
      
      // Clear user state
      setUser(null)
      
      // Redirect to sign in
      router.push("/login")
      toast.success("Signed out successfully!")
    } catch (error: any) {
      const errorMessage = getAuthErrorMessage(error)
      toast.error(errorMessage)
      throw error
    }
  }

  if (loading) {
    return null // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 