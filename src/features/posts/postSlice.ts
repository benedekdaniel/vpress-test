import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PostType } from "features/posts/post.type";

const DUMMY_API_URL = "https://dummyapi.io/data/v1/post?limit=10";
const DUMMY_API_KEY = "628cfd76d7c13ab387fde193";

const initialState = {
	posts: [],
	status: "idle" //'idle' | 'loading' | 'succeeded'
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	const response = await axios.get(DUMMY_API_URL, {
		headers: {
			"app-id": DUMMY_API_KEY
		}
	});
	return response.data;
});

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = "succeeded";
				const loadedPosts = action.payload.data.map(
					(post: PostType) => {
						return post;
					}
				);

				// Add fetched posts to the array
				state.posts = state.posts.concat(loadedPosts);
			});
	}
});

export const selectAllPosts = (state: any) => state.posts.posts;
export const getPostsStatus = (state: any) => state.posts.status;

export default postsSlice.reducer;
