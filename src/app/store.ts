import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postSlice";

export const store = configureStore({
	reducer: {
		posts: postsReducer
	}
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState}
export type AppDispatch = typeof store.dispatch;
