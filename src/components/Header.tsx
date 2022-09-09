import { setFilterValue } from "features/posts/postSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Header = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const dispatch = useDispatch();

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(setFilterValue(searchTerm));
		setSearchTerm("");
	};

	return (
		<div className="header-wrapper">
			<h1 className="page-title">Today's news</h1>
			<div className="form-control">
				<form className="input-group" onSubmit={submitHandler}>
					<input
						type="text"
						placeholder="Search by tag…"
						className="input input-bordered bg-base-200"
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
					<button className="btn btn-square" type="submit">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</button>
				</form>
			</div>
		</div>
	);
};

export default Header;
