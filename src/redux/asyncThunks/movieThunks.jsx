import {  createAsyncThunk } from '@reduxjs/toolkit'
import { getMovies } from '../api/movieAPI'

export const getAsyncMovies = createAsyncThunk(
    'movies/getMovies',
    async (_, {rejectWithValue}) => {
    try {

            const res = await getMovies();
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.error('Failed to fetch movies:', error);
            return rejectWithValue(error.message || 'Failed to fetch movies');
        }
    }
)


export const getAsyncSigleMovie = createAsyncThunk(
    'movies/getSingleMovie',
    async (id, {rejectWithValue}) => {
    try {

            const res = await getMovies(id);
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.error('Failed to fetch movies:', error);
            return rejectWithValue(error.message || 'Failed to fetch movies');
        }
    }
)