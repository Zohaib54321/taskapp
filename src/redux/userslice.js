import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../services/userApi";


export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => await getUsers()
);

const userSlice = createSlice({

  name: "users",
  
  initialState: {
    items: [],
    loading: false,
    error: "",
  },

  reducers: {},
  extraReducers: (builder) => {

    builder

      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
     state.loading = false;
     state.items = action.payload;
      })

   .addCase(fetchUsers.rejected, (state) => {
   state.loading = false;
     state.error = "Unable to load users.";
      });

  },

});


export default userSlice.reducer;