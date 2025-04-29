// context/FavoritesContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (item: string) => Promise<void>;
  removeFavorite: (item: string) => Promise<void>;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from AsyncStorage when app starts
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await AsyncStorage.getItem('favorites');
        if (data) {
          const parsed = JSON.parse(data);
          console.log('📦 Loaded favorites from storage:', parsed);
          setFavorites(parsed);
        } else {
          console.log('📦 No favorites found.');
        }
      } catch (error) {
        console.error('❌ Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  // Add a favorite and immediately update AsyncStorage
  const addFavorite = async (item: string) => {
    try {
      const updated = [...favorites, item];
      setFavorites(updated);
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
      console.log('❤️ Added to favorites:', item);
      console.log('📦 Favorites now:', updated);
    } catch (error) {
      console.error('❌ Error adding favorite:', error);
    }
  };

  // Remove a favorite and immediately update AsyncStorage
  const removeFavorite = async (item: string) => {
    try {
      const updated = favorites.filter(fav => fav !== item);
      setFavorites(updated);
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
      console.log('💔 Removed from favorites:', item);
      console.log('📦 Favorites now:', updated);
    } catch (error) {
      console.error('❌ Error removing favorite:', error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
  return context;
};
