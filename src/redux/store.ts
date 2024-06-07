import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";

export const server = import.meta.env.VITE_SERVER;

// console.log(userAPI);

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
  },

  // middleware: (mid) => [...mid(), userAPI.middleware],

  middleware: (gDM) => gDM().concat(userAPI.middleware),

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(userAPI.middleware),
});
