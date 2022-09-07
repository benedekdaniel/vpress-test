export type PostType = {
	id: string;
	image: string;
	likes: number;
	publishDate: string;
	tags: string[];
	text: string;
};

export enum PostStatus {
	idle = "idle",
	loading = "loading",
	succeeded = "succeded"
}
