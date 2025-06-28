import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'
import { getWatchlist, addToWatchlist as addMovie, removeFromWatchlist as removeMovie, isInWatchlist } from '../lib/supabase'

export const useWatchlist = () => {
  const { user } = useAuth()
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchWatchlist = async () => {
    if (!user) return
    
    setLoading(true)
    const { data, error } = await getWatchlist(user.id)
    if (!error && data) {
      setWatchlist(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchWatchlist()
  }, [user])

  const addToWatchlist = async (movie) => {
    if (!user) return { error: 'User not authenticated' }
    
    const { data, error } = await addMovie(user.id, movie)
    if (!error) {
      setWatchlist(prev => [data, ...prev])
    }
    return { data, error }
  }

  const removeFromWatchlist = async (movieId) => {
    if (!user) return { error: 'User not authenticated' }
    
    const { error } = await removeMovie(user.id, movieId)
    if (!error) {
      setWatchlist(prev => prev.filter(item => item.movie_id !== movieId))
    }
    return { error }
  }

  const checkIsInWatchlist = async (movieId) => {
    if (!user) return false
    
    const { exists } = await isInWatchlist(user.id, movieId)
    return exists
  }

  return {
    watchlist,
    loading,
    addToWatchlist,
    removeFromWatchlist,
    checkIsInWatchlist,
    refetch: fetchWatchlist
  }
}