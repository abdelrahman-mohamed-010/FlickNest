import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    movies: [],
  },
  reducers: {
    addToWatchlist: (state, action) => {
      const movie = action.payload;
      state.movies.push(movie);
    },
    removeFromWatchlist: (state, action) => {
      const movieId = action.payload;
      state.movies = state.movies.filter((movie) => movie.id !== movieId);
    },
    
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;

export default watchlistSlice.reducer;
