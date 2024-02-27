import {createSlice, combineReducers} from '@reduxjs/toolkit';
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchSimilarMovies,
  fetchPersonDetails,
  fetchPersonMovies,
} from './moviesThunks';

const initialState = {
  trendingMovies: [],
  upcomingMovies: [],
  topRatedMovies: [],
  movieDetails: [],
  movieCredits: [],
  similarMovies: [],
  personDetails: [],
  personMovies: [],
  loading: false,
  error: null,
};

const trendingMoviesSlice = createSlice({
  name: 'trendingMovies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTrendingMovies.pending, state => {
        state.loading = true;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.trendingMovies = action.payload;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
const upcomingMoviesSlice = createSlice({
  name: 'upcomingMovies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUpcomingMovies.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingMovies = action.payload;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
const topRatedMoviesSlice = createSlice({
  name: 'topRatedMovies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTopRatedMovies.pending, state => {
        state.loading = true;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.topRatedMovies = action.payload;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMovieDetails.pending, state => {
        state.loading = true;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetails = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
const movieCreditsSlice = createSlice({
  name: 'movieCredits',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMovieCredits.pending, state => {
        state.loading = true;
      })
      .addCase(fetchMovieCredits.fulfilled, (state, action) => {
        state.loading = false;
        state.movieCredits = action.payload;
      })
      .addCase(fetchMovieCredits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const similarMoviesSlice = createSlice({
  name: 'similarMovies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSimilarMovies.pending, state => {
        state.loading = true;
      })
      .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.similarMovies = action.payload;
      })
      .addCase(fetchSimilarMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
const personDetailsSlice = createSlice({
  name: 'personDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPersonDetails.pending, state => {
        state.loading = true;
      })
      .addCase(fetchPersonDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.personDetails = action.payload;
      })
      .addCase(fetchPersonDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
const personMoviesSlice = createSlice({
  name: 'personMovies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPersonMovies.pending, state => {
        state.loading = true;
      })
      .addCase(fetchPersonMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.personMovies = action.payload;
      })
      .addCase(fetchPersonMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const selectTrendingMovies = state => state.movies.trendingMovies;
export const selectupComingMovies = state => state.movies.upcomingMovies;
export const selectTopRatedMovies = state => state.movies.topRatedMovies;
export const selectMoviesDetails = state => state.movies.movieDetails;
export const selectMovieCredits = state => state.movies.movieCredits;
export const selectsimilarMovies = state => state.movies.similarMovies;
export const selectpersonDetails = state => state.movies.personDetails;
export const selectpersonMovies = state => state.movies.personMovies;

export const rootReducer = combineReducers({
  trendingMovies: trendingMoviesSlice.reducer,
  upcomingMovies: upcomingMoviesSlice.reducer,
  topRatedMovies: topRatedMoviesSlice.reducer,
  movieDetails: movieDetailsSlice.reducer,
  movieCredits: movieCreditsSlice.reducer,
  similarMovies: similarMoviesSlice.reducer,
  personDetails: personDetailsSlice.reducer,
  personMovies: personMoviesSlice.reducer,
});
