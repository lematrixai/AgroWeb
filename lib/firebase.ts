import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, Auth, fetchSignInMethodsForEmail } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

console.log('Firebase initialization started');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDNODG7Fu0di1aMzg85v1_w8LrDQDYTbBQ",
    authDomain: "agro-web-f5db4.firebaseapp.com",
    projectId: "agro-web-f5db4",
    storageBucket: "agro-web-f5db4.firebasestorage.app",
    messagingSenderId: "1070998545332",
    appId: "1:1070998545332:web:8e066db4bc1daf6b09c8e1",
    measurementId: "G-XB8EDYJTYJ"
  };

// Check for missing environment variables
const missingEnvVars = Object.entries(firebaseConfig)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

if (missingEnvVars.length > 0) {
    console.error('Missing required environment variables:', missingEnvVars);
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}



console.log('Firebase config validation:', {
    hasApiKey: !!firebaseConfig.apiKey,
    hasAuthDomain: !!firebaseConfig.authDomain,
    hasProjectId: !!firebaseConfig.projectId,
    hasStorageBucket: !!firebaseConfig.storageBucket,
    hasMessagingSenderId: !!firebaseConfig.messagingSenderId,
    hasAppId: !!firebaseConfig.appId,
});

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Connect to emulators in development
if (process.env.NODE_ENV === 'development') {
    console.log('Development environment detected');
    if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true') {
        console.log('Connecting to Firebase emulators');
        connectAuthEmulator(auth, 'http://localhost:9099');
        connectFirestoreEmulator(db, 'localhost', 8080);
    }
}

console.log('Firebase initialization completed successfully');


export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    console.log('Checking if email exists:', email);
    if (!auth) {
      console.error('Firebase Auth is not initialized');
      return false;
    }

    const methods = await fetchSignInMethodsForEmail(auth, email);
    console.log('Sign-in methods found:', methods);
    
    // If methods array has any items, email exists
    const exists = methods && methods.length > 0;
    console.log('Email exists:', exists);
    
    return exists;
  } catch (error) {
    console.error('Error checking email:', error);
    // If there's an error, assume the email might exist to be safe
    return true;
  }
}

export { app, auth, db };


