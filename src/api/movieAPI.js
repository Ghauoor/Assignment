import axios from 'axios';
import {apiKey} from '../constants/constant';

const apiBaseUrl = 'https://api.themoviedb.org/3';

const endpoints = {
  trendingMovies: `/trending/movie/day?api_key=${apiKey}`,
  upcomingMovies: `/movie/upcoming?api_key=${apiKey}`,
  topRatedMovies: `/movie/top_rated?api_key=${apiKey}`,
  searchMovies: `/search/movie?api_key=${apiKey}`,
  movieDetails: id => `/movie/${id}?api_key=${apiKey}`,
  movieCredits: id => `/movie/${id}/credits?api_key=${apiKey}`,
  similarMovies: id => `/movie/${id}/similar?api_key=${apiKey}`,
  personDetails: id => `/person/${id}?api_key=${apiKey}`,
  personMovies: id => `/person/${id}/movie_credits?api_key=${apiKey}`,
};

const apiCall = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${apiBaseUrl}${endpoint}`, {params});
    return response.data;
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

export const image500 = path =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342 = path =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185 = path =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : null;

// fallback images
export const fallbackMoviePoster =
  'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

const movieAPI = {
  fetchTrendingMovies: () => apiCall(endpoints.trendingMovies),
  fetchUpcomingMovies: () => apiCall(endpoints.upcomingMovies),
  fetchTopRatedMovies: () => apiCall(endpoints.topRatedMovies),
  searchMovies: query => apiCall(endpoints.searchMovies, {query}),
  fetchMovieDetails: id => apiCall(endpoints.movieDetails(id)),
  fetchMovieCredits: id => apiCall(endpoints.movieCredits(id)),
  fetchSimilarMovies: id => apiCall(endpoints.similarMovies(id)),
  fetchPersonDetails: id => apiCall(endpoints.personDetails(id)),
  fetchPersonMovies: id => apiCall(endpoints.personMovies(id)),
};

export default movieAPI;
