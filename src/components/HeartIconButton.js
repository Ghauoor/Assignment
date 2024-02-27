import React from 'react';
import {TouchableOpacity} from 'react-native';
import {HeartIcon} from 'react-native-heroicons/solid';
import {useSelector, useDispatch} from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from '../features/favorite/favoritesSlice';
const HeartIconButton = ({movie}) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);
  const isFavorite = favorites.some(fav => fav.id === movie.id);
  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  return (
    <TouchableOpacity onPress={toggleFavorite}>
      <HeartIcon
        name={isFavorite ? 'heart' : 'heart-o'}
        size={34}
        color={isFavorite ? 'red' : 'grey'}
      />
    </TouchableOpacity>
  );
};

export default HeartIconButton;
