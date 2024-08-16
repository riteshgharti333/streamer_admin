import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteSingleUser, getSingleUser, getUsers } from "../api/userAPI";



//GET ALL USER
export const getAsyncUsers = createAsyncThunk(
    "users/getUsers",
    async(_, {rejectWithValue}) =>{
        try {
            const res = await getUsers();
            return res.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message || "Failed to fetch users");
        }
    }
)

//GET SINGLE USER
export const getAsyncSingleUser = createAsyncThunk(
    "users/getSingleUser",
    async(id, {rejectWithValue}) =>{
        try {
            const res = await getSingleUser(id);
            return res.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message || "Failed to fetch user");
        }
    }
)

//DELETE USER
export const deleteAsyncSingleUser = createAsyncThunk(
    "users/deleteSingleUser",
    async(id, {rejectWithValue}) =>{
        try {
            await deleteSingleUser(id);
            return id;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message || "Failed to fetch user");
        }
    }
)
