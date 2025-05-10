import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  role: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setUser, setUsername, setEmail, setRole } = userSlice.actions;

export default userSlice.reducer;
