import type { AppDispatch } from "../src/app/store";
import { Post } from "components/Post";
import { PostStatus } from "features/posts/post.type";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getPostsStatus,
	fetchPosts,
	getPostsPerPage,
	getPage,
	setPage,
	getVisiblePostsInfo
} from "./features/posts/postSlice";
import Header from "components/Header";
import Pagination from "components/Pagination";

const App = () => {
	const dispatch = useDispatch<AppDispatch>();

	const page = useSelector(getPage);
	const postsPerPage = useSelector(getPostsPerPage);
	const postStatus = useSelector(getPostsStatus);
	const { visiblePosts, visiblePostsLength } =
		useSelector(getVisiblePostsInfo);

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	const paginate = (pageNumber: number) => {
		dispatch(setPage(pageNumber));
	};

	return (
		<section className="page-wrapper">
			{postStatus === PostStatus.loading ? (
				<h4>Loading...</h4>
			) : (
				<>
					<Header />
					{visiblePosts.map(post => (
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
					))}
					<Pagination
						page={page}
						postsPerPage={postsPerPage}
						totalPosts={visiblePostsLength}
						paginate={paginate}
					/>
				</>
			)}
		</section>
	);
};

export default App;
