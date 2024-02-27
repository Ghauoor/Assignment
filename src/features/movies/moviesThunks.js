import {createAsyncThunk} from '@reduxjs/toolkit';
import movieAPI from '../../api/movieAPI';

// handle async API calls
const handleAsyncAPI = async (apiFunction, ...args) => {
  try {
    const response = await apiFunction(...args);
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Thunk for fetching trending movies
export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrending',
  async () => {
    const response = await handleAsyncAPI(movieAPI.fetchTrendingMovies);
    return response?.results;
  },
);

// Thunk for fetching upcoming movies
export const fetchUpcomingMovies = createAsyncThunk(
  'movies/fetchUpcomingMovies',
  async () => {
    const response = await handleAsyncAPI(movieAPI.fetchUpcomingMovies);
    return response?.results;
  },
);

// Thunk for fetching top rated movies
export const fetchTopRatedMovies = createAsyncThunk(
  'movies/fetchTopRatedMovies',
  async () => {
    const response = await handleAsyncAPI(movieAPI.fetchTopRatedMovies);
    return response?.results;
  },
);

// Thunk for searching movies
export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async query => {
    return await handleAsyncAPI(movieAPI.searchMovies, query);
  },
);

// Thunk for fetching movie details
export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async id => {
    return await handleAsyncAPI(movieAPI.fetchMovieDetails, id);
  },
);

// Thunk for fetching movie credits
export const fetchMovieCredits = createAsyncThunk(
  'movies/fetchMovieCredits',
  async id => {
    const response = await handleAsyncAPI(movieAPI.fetchMovieCredits, id);
    return response?.cast;
  },
);

// Thunk for fetching similar movies
export const fetchSimilarMovies = createAsyncThunk(
  'movies/fetchSimilarMovies',
  async id => {
    const response = await handleAsyncAPI(movieAPI.fetchSimilarMovies, id);
    return response?.results;
  },
);

// Thunk for fetching person details
export const fetchPersonDetails = createAsyncThunk(
  'movies/fetchPersonDetails',
  async id => {
    return await handleAsyncAPI(movieAPI.fetchPersonDetails, id);
  },
);

// Thunk for fetching person movies
export const fetchPersonMovies = createAsyncThunk(
  'movies/fetchPersonMovies',
  async id => {
    const response = await handleAsyncAPI(movieAPI.fetchPersonMovies, id);
    return response?.cast;
  },
);
