import { createSlice } from "@reduxjs/toolkit";
import {
  deleteAsyncSingleList,
  getAsyncLists,
  getAsyncQueryLists,
  getAsyncSingleList,
} from "../asyncThunks/listThunks";

const initialState = {
  lists: [],
  status: "idle",
  error: null,
};

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //  Get All Lists
    builder
      .addCase(getAsyncLists.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAsyncLists.fulfilled, (state,action) => {
        state.status = "idle";
        state.lists = action.payload;
      })
      .addCase(getAsyncLists.rejected, (state,action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    //  Get Query Lists
    builder
      .addCase(getAsyncQueryLists.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAsyncQueryLists.fulfilled, (state,action) => {
        state.status = "idle";
        state.lists = action.payload;
      })
      .addCase(getAsyncQueryLists.rejected, (state,action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    //  Get Single List
    builder
      .addCase(getAsyncSingleList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAsyncSingleList.fulfilled, (state,action) => {
        state.status = "idle";
        state.lists = action.payload;
      })
      .addCase(getAsyncSingleList.rejected, (state,action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    //  delete All List
    builder
      .addCase(deleteAsyncSingleList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteAsyncSingleList.fulfilled, (state,action) => {
        state.status = "idle";
        const deletedListId = action.payload;

        if (Array.isArray(state.lists.lists)) {
          state.lists.lists = state.lists.lists.filter(
            (list) => list._id !== deletedListId
          );
        }
      })
      .addCase(deleteAsyncSingleList.rejected, (state,action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});


export default listSlice.reducer;