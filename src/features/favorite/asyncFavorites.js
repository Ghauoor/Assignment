// asyncFavorites.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveFavoritesToStorage = async favorites => {
  await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
};

export const getFavoritesFromStorage = async () => {
  const data = await AsyncStorage.getItem('favorites');
  return data ? JSON.parse(data) : [];
};

export const removeFavoriteFromStorage = async movieId => {
  const storedFavorites = await getFavoritesFromStorage();
  const updatedFavorites = storedFavorites.filter(item => item.id !== movieId);
  await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  return movieId;
};
