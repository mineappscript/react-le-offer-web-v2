import { configureStore } from '@reduxjs/toolkit';
import { rootApi } from './apiSlices/rootApi';
import {authSlice} from './slices/authSlice';
// import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = {
  auth: authSlice.reducer,
  [rootApi.reducerPath]: rootApi.reducer,
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware),
  devTools: true,
});
export default store;

// setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
