import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from '../movies/moviesSlice';
import favoritesReducer from '../favorite/favoritesSlice';

export default configureStore({
  reducer: {
    movies: rootReducer,
    favorites: favoritesReducer,
  },
});
