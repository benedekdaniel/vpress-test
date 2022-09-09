import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios from "axios";
import { PostStatus, PostType } from "features/posts/post.type";

// These values could be passed into an ENV file (process.env)
const DUMMY_API_URL = "https://dummyapi.io/data/v1/post?limit=10";
const DUMMY_API_KEY = "628cfd76d7c13ab387fde193";

interface PostsState {
	posts: Array<PostType>;
	filterValue: string;
	status: PostStatus;
	page: number;
	postsPerPage: number;
}

const initialState: PostsState = {
	posts: [],
	filterValue: "",
	status: PostStatus.idle,
	page: 1,
	postsPerPage: 2
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
	reducers: {
		setFilterValue: (state, action) => {
			state.filterValue = action.payload;
		},
		setPage: (state, action) => {
			state.page = action.payload;
		}
	},
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

export const { setFilterValue, setPage } = postsSlice.actions;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getFilterValue = (state: RootState) => state.posts.filterValue;
export const getPostsPerPage = (state: RootState) => state.posts.postsPerPage;
export const getPage = (state: RootState) => state.posts.page;
export const getVisiblePostsInfo = (state: RootState) => {
	const { posts, filterValue, page, postsPerPage } = state.posts;

	const postsToShow = !filterValue
		? posts
		: posts.filter(post => post.tags.includes(filterValue));

	const lastPostIndex = page * postsPerPage;
	const firstPostIndex = lastPostIndex - postsPerPage;

	return {
		visiblePosts: postsToShow.slice(firstPostIndex, lastPostIndex),
		visiblePostsLength: postsToShow.length
	};
};

export default postsSlice.reducer;
