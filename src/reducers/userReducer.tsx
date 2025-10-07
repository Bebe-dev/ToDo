import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  email: string | null;
  username: string | null;
  uid: string | null;
}

const initialState: UserState = {
  email: null,
  username: null,
  uid: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username
      state.uid = action.payload.uid;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = UserSlice.actions;
export default UserSlice.reducer;
