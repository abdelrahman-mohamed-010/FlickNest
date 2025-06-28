import { useState, useEffect, createContext, useContext } from 'react'
import { supabase, getCurrentUser, getProfile } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { user: currentUser } = await getCurrentUser()
      setUser(currentUser)
      
      if (currentUser) {
        const { data: profileData } = await getProfile(currentUser.id)
        setProfile(profileData)
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          const { data: profileData } = await getProfile(session.user.id)
          setProfile(profileData)
        } else {
          setProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const value = {
    user,
    profile,
    loading,
    signUp: async (email, password, fullName) => {
      const { signUp } = await import('../lib/supabase')
      return signUp(email, password, fullName)
    },
    signIn: async (email, password) => {
      const { signIn } = await import('../lib/supabase')
      return signIn(email, password)
    },
    signOut: async () => {
      const { signOut } = await import('../lib/supabase')
      return signOut()
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}