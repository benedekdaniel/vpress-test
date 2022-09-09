import type { AppDispatch } from "../src/app/store";
import { Post } from "components/Post";
import { PostStatus } from "features/posts/post.type";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectAllPosts,
	getPostsStatus,
	fetchPosts,
	getFilterValue
} from "./features/posts/postSlice";
import Header from "components/Header";
import Pagination from "components/Pagination";

const App = () => {
	const [page, setPage] = useState(1);
	const [postsPerPage] = useState(2);

	const dispatch = useDispatch<AppDispatch>();

	const posts = useSelector(selectAllPosts);
	const postStatus = useSelector(getPostsStatus);
	const filterValue = useSelector(getFilterValue);

	useEffect(() => {
		if (postStatus === PostStatus.idle) {
			dispatch(fetchPosts());
		}
	}, [postStatus, dispatch]);

	const postsToShow = !filterValue
		? posts
		: posts.filter(post => post.tags.includes(filterValue));

	const lastPostIndex = page * postsPerPage;
	const firstPostIndex = lastPostIndex - postsPerPage;

	const currentPosts = postsToShow.slice(firstPostIndex, lastPostIndex);

	const paginate = (pageNumber: number) => {
		setPage(pageNumber);
	};

	return (
		<section className="page-wrapper">
			{postStatus === PostStatus.loading ? (
				<h4>Loading...</h4>
			) : (
				<>
					<Header />
					{currentPosts.map(post => {
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
						totalPosts={postsToShow.length}
						paginate={paginate}
					/>
				</>
			)}
		</section>
	);
};

export default App;
