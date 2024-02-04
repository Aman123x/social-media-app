import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getDataFromServer = createAsyncThunk('post/getDataFromServer', async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      // console.log('Data received:', data);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  });
  
  
  const postSlice = createSlice({
    name: 'post',
    initialState: {
      post: [],
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getDataFromServer.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getDataFromServer.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.post = action.payload;
        })
        .addCase(getDataFromServer.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });
  
  export default postSlice.reducer;