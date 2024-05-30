import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import chatLoomStoreReducer from "./chatLoomStore";

const reduxStore = configureStore({
  reducer: {
    auth: authReducer,
    store: chatLoomStoreReducer,
  },
});

export default reduxStore;
