import { createSlice } from "@reduxjs/toolkit";
import {
  createAsyncSingleMovie,
  deleteAsyncSigleMovie,
  getAsyncMovies,
  getAsyncSigleMovie,
  getQueryAsyncMovies,
} from "../asyncThunks/movieThunks";

const initialState = {
  movies: [],
  singleMovie: null,
  status: "idle",
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //  Get All Movies

      .addCase(getAsyncMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAsyncMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(getAsyncMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

       //  Get Query Movies
       builder
       .addCase(getQueryAsyncMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getQueryAsyncMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(getQueryAsyncMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Get Single Movie
    builder
      .addCase(getAsyncSigleMovie.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAsyncSigleMovie.fulfilled, (state, action) => {
        state.status = "idle";
        state.singleMovie = action.payload;
      })
      .addCase(getAsyncSigleMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    //  Delete Single Movie
    builder
      .addCase(deleteAsyncSigleMovie.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteAsyncSigleMovie.fulfilled, (state, action) => {
        state.status = "idle";
        const deletedMovieId = action.payload; 
        state.movies = state.movies.filter(movie => movie.id !== deletedMovieId);

        // Clear singleMovie if it was the deleted movie
        if (state.singleMovie && state.singleMovie.id === deletedMovieId) {
          state.singleMovie = null;
        }
      })
      .addCase(deleteAsyncSigleMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    //  Create Single Movie
    builder
    .addCase(createAsyncSingleMovie.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(createAsyncSingleMovie.fulfilled, (state, action) => {
      state.status = "idle";
      state.movies.push(action.payload)
    })
    .addCase(createAsyncSingleMovie.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

  },
});

export default movieSlice.reducer;
