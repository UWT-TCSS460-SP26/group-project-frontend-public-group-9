'use client'
import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
 
export default function Page() {
    const { data: session } = useSession()
    useEffect(() => {
        if (session?.error !== 'RefreshTokenError') return
        signIn('tcss460')
    }, [session?.error])
}