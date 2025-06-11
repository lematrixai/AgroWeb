'use server'

import { cookies } from 'next/headers'
import { SignJWT } from 'jose'
import { jwtVerify } from 'jose'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
)

export async function createSessionCookie(idToken: string) {
  try {
    console.log('Creating session cookie...')
    // Decode Firebase token
    const decodedToken = JSON.parse(atob(idToken.split('.')[1]))
    console.log('Decoded Firebase token:', decodedToken)
    
    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', decodedToken.user_id))
    const userData = userDoc.data()
    console.log('User data from Firestore:', userData)

    if (!userData) {
      console.log('No user data found in Firestore')
      throw new Error('User data not found')
    }

    // Create a JWT for user data
    const userJWT = await new SignJWT({
      token: idToken,
      role: userData.role || 'user',
      uid: decodedToken.user_id,
      email: decodedToken.email,
      isAuthorized: userData.isAuthorized
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('5d')
      .sign(JWT_SECRET)

    console.log('JWT created successfully')

    // Set the cookie with proper options
    const cookieStore = await cookies()
    await cookieStore.set('__session', userJWT, {
      maxAge: 60 * 60 * 24 * 5, // 5 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      domain: process.env.NODE_ENV === 'production' ? process.env.COOKIE_DOMAIN : undefined
    })

    console.log('Session cookie set successfully')
    return { success: true }
  } catch (error) {
    console.error('Error creating session cookie:', error)
    return { success: false, error: 'Failed to create session' }
  }
}

export async function deleteSessionCookie() {
  try {
    console.log('Deleting session cookie...')
    const cookieStore = await cookies()
    await cookieStore.set('__session', '', {
      maxAge: 0,
      path: '/',
      domain: process.env.NODE_ENV === 'production' ? process.env.COOKIE_DOMAIN : undefined
    })
    console.log('Session cookie deleted successfully')
    return { success: true }
  } catch (error) {
    console.error('Error deleting session cookie:', error)
    return { success: false, error: 'Failed to delete session' }
  }
}

export async function verifySession() {
  try {
    console.log('Verifying session...')
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('__session')?.value
    console.log('Session cookie exists:', !!sessionCookie)

    if (!sessionCookie) {
      console.log('No session cookie found')
      return { success: false, error: 'No session cookie found' }
    }

    // Verify the JWT
    const { payload } = await jwtVerify(sessionCookie, JWT_SECRET)
    console.log('JWT payload:', payload)
    
    // Check if user is still authorized
    if (!payload.isAuthorized) {
      console.log('User is not authorized')
      await deleteSessionCookie()
      return { success: false, error: 'User is not authorized' }
    }

    console.log('Session verified successfully')
    return { 
      success: true, 
      token: payload.token,
      role: payload.role,
      uid: payload.uid,
      email: payload.email,
      isAuthorized: payload.isAuthorized
    }
  } catch (error) {
    console.error('Error verifying session:', error)
    return { success: false, error: 'Invalid session' }
  }
}

export async function getUserEmail(): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('__session')?.value
    if (!sessionCookie) return null

    const { payload } = await jwtVerify(sessionCookie, JWT_SECRET)
    return payload.email as string || null
  } catch (error) {
    console.error("Error getting user email:", error)
    return null
  }
}