import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios from "axios";
import { PostStatus, PostType } from "features/posts/post.type";

// These values could be passed into an ENV file (process.env)
const DUMMY_API_URL = "https://dummyapi.io/data/v1/post?limit=10";
const DUMMY_API_KEY = "628cfd76d7c13ab387fde193";

interface PostsState {
	posts: Array<PostType>;
	status: PostStatus;
}

const initialState: PostsState = {
	posts: [],
	status: PostStatus.idle
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
				state.status = PostStatus.loading;
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = PostStatus.succeeded;
				const loadedPosts = action.payload.data;

				loadedPosts.forEach((loaded: PostType) => {
					if (!state.posts.some(p => p.id === loaded.id)) {
						state.posts.push(loaded);
					}
				});
			});
	}
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const filterByAnimals = (state: RootState) =>
	state.posts.posts.filter(p => p.tags.includes("animal"));

export default postsSlice.reducer;
