import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteSingleList,
  getLists,
  getQueryLists,
  getSingleList,
  updateSingleList,
} from "../api/listAPI";

//GET ALL LISTS
export const getAsyncLists = createAsyncThunk(
  "lists/getLists",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getLists();
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message || "Failed to fetch lists");
    }
  }
);

//GET QUERY LITS
export const getAsyncQueryLists = createAsyncThunk(
  "lists/getQueryLists",
  async (query, { rejectWithValue }) => {
    try {
      const res = await getQueryLists(query);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message || "Failed to fetch query lists");
    }
  }
);

//GET SINGLE LIST
export const getAsyncSingleList = createAsyncThunk(
  "lists/getSingleList",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getSingleList(id);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message || "Failed to fetch single list");
    }
  }
);

//DELETE LISTS
export const deleteAsyncSingleList = createAsyncThunk(
  "lists/deleteSingleList",
  async (id, { rejectWithValue }) => {
    try {
      await deleteSingleList(id);
      console.log(id);
      return id;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message || "Failed to delete list");
    }
  }
);

//UPDATE LIST
export const updateAsyncSingleList = createAsyncThunk(
  "movies/updateSingleList",
  async ({id,updateList}, { rejectWithValue }) => {
    try {
      const response = await updateSingleList(id,updateList);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message || "Failed to update list");
    }
  }
);

