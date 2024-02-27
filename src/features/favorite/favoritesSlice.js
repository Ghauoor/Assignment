// favoritesSlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  saveFavoritesToStorage,
  getFavoritesFromStorage,
  removeFavoriteFromStorage,
} from './asyncFavorites';

export const loadFavorites = createAsyncThunk(
  'favorites/loadFavorites',
  async () => {
    return await getFavoritesFromStorage();
  },
);

export const addToFavorites = createAsyncThunk(
  'favorites/addToFavorites',
  async (movie, {getState}) => {
    const {favorites} = getState();
    const updatedFavorites = [...favorites.items, movie];
    await saveFavoritesToStorage(updatedFavorites);
    return movie;
  },
);

export const removeFromFavorites = createAsyncThunk(
  'favorites/removeFromFavorites',
  async movieId => {
    return await removeFavoriteFromStorage(movieId);
  },
);

const initialState = {
  items: [],
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadFavorites.pending, state => {
        state.status = 'loading';
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(loadFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default favoritesSlice.reducer;
