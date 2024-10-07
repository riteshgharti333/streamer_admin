import { createSlice } from "@reduxjs/toolkit";
import {
  deleteAsyncSingleUser,
  getAsyncSingleUser,
  getAsyncUsers,
  updateAsyncSingleUser,
} from "../asyncThunks/userThunks";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // Get All Users
    builder
      .addCase(getAsyncUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAsyncUsers.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
      })
      .addCase(getAsyncUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Get Single User
    builder
      .addCase(getAsyncSingleUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAsyncSingleUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
      })
      .addCase(getAsyncSingleUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Delete Single User
    builder
      .addCase(deleteAsyncSingleUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(deleteAsyncSingleUser.fulfilled, (state, action) => {
        state.status = "idle";
        const { id } = action.payload;
        console.log(id);

        if (Array.isArray(state.users.users)) {
          state.users.users = state.users.users.filter(
            (user) => user._id !== id,
          );
        }
      })
      .addCase(deleteAsyncSingleUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Update Single User
    builder
      .addCase(updateAsyncSingleUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateAsyncSingleUser.fulfilled, (state, action) => {
        state.status = "idle";
        const updatedUser = action.payload.updatedUser;
        const index = state.users.findIndex(
          (user) => user.id === updatedUser.id,
        ); // Adjust based on your state structure
        if (index !== -1) {
          state.users[index] = updatedUser; // Replace the old user with the updated one
        }
      })
      .addCase(updateAsyncSingleUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
