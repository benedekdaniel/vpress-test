interface PaginationProps {
	page: number;
	postsPerPage: number;
	totalPosts: number;
	paginate: (pageNumber: number) => void;
}

const Pagination = ({
	page,
	postsPerPage,
	totalPosts,
	paginate
}: PaginationProps) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	const activeBtn = "btn btn-active";
	return (
		<div className="btn-group">
			{pageNumbers.map(number => (
				<button
					key={number}
					className={page === number ? activeBtn : "btn"}
					onClick={() => paginate(number)}>
					{number}
				</button>
			))}
		</div>
	);
};

export default Pagination;
