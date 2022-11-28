import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "../redux/weatherSlice";
import iconSlice from "./iconSlice";
import modalSlice from "./modalSlice";

export const store = configureStore({
  reducer: {
    weatherData: weatherSlice.reducer,
    modalStatus: modalSlice.reducer,
    iconStatus: iconSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
