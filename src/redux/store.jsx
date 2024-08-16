import {configureStore} from '@reduxjs/toolkit'
import movieReducer from "./slices/movieSlice";
import userReducer from "./slices/userSlice";
import listReducer from "./slices/listSlice";




export const store = configureStore({
    reducer: {
        movies: movieReducer, 
        users: userReducer, 
        lists: listReducer
    },
});
