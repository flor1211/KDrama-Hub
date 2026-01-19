import { createContext, useState, useContext, useEffect } from "react";

const DramaContext = createContext()

export const useDramaContext = () => useContext(DramaContext)

export const DramaProvider = ({children}) => {

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")

        if (storedFavs) setFavorites(JSON.parse(storedFavs))

    }, [])

    useEffect(() => {
        localStorage.setItem('favorite', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (drama) => {
        setFavorites(prev => [...prev, drama])
    }

    const removeFromFavorites = (dramaId) => {
        setFavorites(prev => prev.filter(drama => drama.id !== dramaId))
    }

    const isFavorite = (dramaId) => {
        return favorites.some(drama => drama.id === dramaId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <DramaContext.Provider value={value}>
        {children}
    </DramaContext.Provider>
}
