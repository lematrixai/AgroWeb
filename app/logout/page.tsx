'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { toast } from 'sonner'
import { deleteSessionCookie } from '@/lib/action/action.auth'

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Sign out from Firebase
        await signOut(auth)
        
        // Delete the session cookie
        const result = await deleteSessionCookie()
        if (!result.success) {
          throw new Error('Failed to delete session cookie')
        }

        // Redirect to sign in
        router.push('/sign-in')
        toast.success('Logged out successfully')
      } catch (error) {
        console.error('Logout error:', error)
        toast.error('Failed to logout')
        router.push('/merchant')
      }
    }

    performLogout()
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-2">Logging out...</h2>
        <p className="text-sm text-gray-500">Please wait while we log you out.</p>
      </div>
    </div>
  )
}