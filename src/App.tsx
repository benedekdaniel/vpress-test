import type { AppDispatch } from "../src/app/store";
import { Post } from "components/Post";
import { PostType } from "features/posts/post.type";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectAllPosts,
	getPostsStatus,
	fetchPosts
} from "./features/posts/postSlice";
import Pagination from "components/Pagination";

const App = () => {
	const [page, setPage] = useState(1);
	const [postsPerPage] = useState(2);

	const dispatch = useDispatch<AppDispatch>();

	const posts = useSelector(selectAllPosts);
	const postStatus = useSelector(getPostsStatus);

	useEffect(() => {
		if (postStatus === "idle") {
			dispatch(fetchPosts());
		}
	}, [postStatus, dispatch]);

	const lastPostIndex = page * postsPerPage;
	const firstPostIndex = lastPostIndex - postsPerPage;
	const currentPosts = posts.slice(firstPostIndex, lastPostIndex);

	const paginate = (pageNumber: number) => {
		setPage(pageNumber);
	};

	return (
		<section>
			{postStatus === "loading" ? (
				<h4>Loading...</h4>
			) : (
				<>
					<h1 className="page-title">Today's news</h1>
					{currentPosts.map((post: PostType) => {
						return (
							<div key={post.id} className="post-container">
								<Post
									id={post.id}
									image={post.image}
									likes={post.likes}
									publishDate={post.publishDate}
									tags={post.tags}
									text={post.text}
								/>
							</div>
						);
					})}
					<Pagination
						page={page}
						postsPerPage={postsPerPage}
						totalPosts={posts.length}
						paginate={paginate}
					/>
				</>
			)}
		</section>
	);
};

export default App;
