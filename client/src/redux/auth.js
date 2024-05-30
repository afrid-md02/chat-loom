import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  darkMode: false,
  token: null,
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setDataFromCookies(state, action) {
      state.darkMode = action.payload.darkMode;
      state.token = action.payload.token;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    },
    changeThemeHandler(state, action) {
      state.darkMode = action.payload.darkMode;
    },
    setLogin(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    resetAuthState(state) {
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const {
  setDataFromCookies,
  setLogin,
  resetAuthState,
  changeThemeHandler,
} = authSlice.actions;
export default authSlice.reducer;
