import { configureStore } from "@reduxjs/toolkit";
import postsReducer, { setFilterValue } from "../features/posts/postSlice";

export const store = configureStore({
	reducer: {
		posts: postsReducer,
		setFilterValue: setFilterValue
	}
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, setFilterValue: {payload: any, type: string}}
export type AppDispatch = typeof store.dispatch;
