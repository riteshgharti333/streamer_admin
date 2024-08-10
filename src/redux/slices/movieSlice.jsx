import { createSlice } from "@reduxjs/toolkit";
import { getAsyncMovies, getAsyncSigleMovie } from "../asyncThunks/movieThunks";

const initialState = {
    movies: [],
    status: 'idle',
    error: null,
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAsyncMovies.pending, (state) => {
                state.status = 'loading';
                state.error = null; 
            })
            .addCase(getAsyncMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload;
            })
            .addCase(getAsyncMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload
            });

            // Single Movie
            builder
            .addCase(getAsyncSigleMovie.pending,(state,action) => {
                state.status = 'loading'
            })
    },
});

export default movieSlice.reducer;
