import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createSingleList,
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
      return rejectWithValue(error.response.data || "Failed to fetch lists");
    }
  },
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
      return rejectWithValue(
        error.response.data || "Failed to fetch query lists",
      );
    }
  },
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
      return rejectWithValue(
        error.response.data || "Failed to fetch single list",
      );
    }
  },
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
      return rejectWithValue(error.response.data || "Failed to delete list");
    }
  },
);

//UPDATE LIST
export const updateAsyncSingleList = createAsyncThunk(
  "movies/updateSingleList",
  async ({ id, updateList }, { rejectWithValue }) => {
    try {
      const response = await updateSingleList(id, updateList);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data || "Failed to update list");
    }
  },
);

<<<<<<< HEAD
// CREATING SINGLE LIST
=======
// CREATING SINGLE MOVIE
>>>>>>> f9c7e66 (add create list slice)
export const createAsyncSingleList = createAsyncThunk(
  "movies/createSingleList",
  async (list, { rejectWithValue }) => {
    try {
<<<<<<< HEAD
      const { title, genre, type, content } = list;
=======
      const {
        title,
        genre,
        type,
        content
      } = list;

      // Prepare the new movie object
>>>>>>> f9c7e66 (add create list slice)
      const newList = {
        title,
        genre,
        type,
<<<<<<< HEAD
        content,
=======
        content
>>>>>>> f9c7e66 (add create list slice)
      };
      const response = await createSingleList(newList);
      console.log(response.data);
      return response.data;
<<<<<<< HEAD
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data || "Failed to create movie");
    }
  },
);
=======
  
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message || "Failed to create movie");
    }
  }
);

>>>>>>> f9c7e66 (add create list slice)
