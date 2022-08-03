import { PostType } from "features/posts/post.type";

export const Post = ({
	id,
	image,
	likes,
	publishDate,
	tags,
	text
}: PostType) => {
	return (
		<div className="card w-96 bg-base-200 shadow-xl">
			<figure>
				<img src={image} alt={id} />
			</figure>
			<div className="card-body">
				<h2 className="card-title">
					New Post!
					<div className="badge badge-secondary">👍 {likes}</div>
				</h2>
				<p>{text}</p>
				<div className="card-actions justify-end">
					{tags.map(tag => {
						return (
							<div key={tag} className="badge badge-outline">
								{tag}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
