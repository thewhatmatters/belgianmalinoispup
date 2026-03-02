import { processMarkdown, type BlogPost } from '$lib/utils/markdown';

// Import markdown files as raw strings
import firstTimeOwnerPostMd from '$lib/content/blog/first-time-owner-truth.md?raw';
import isMalinoisRightPostMd from '$lib/content/blog/is-malinois-right-for-you.md?raw';

// Define the blog posts with their content
const blogPostsData = [
	{ slug: 'first-time-owner-truth', content: firstTimeOwnerPostMd },
	{ slug: 'is-malinois-right-for-you', content: isMalinoisRightPostMd }
];

// Cache for processed posts
let processedPosts: BlogPost[] | null = null;

export async function getAllBlogPosts(): Promise<BlogPost[]> {
	if (processedPosts) {
		return processedPosts;
	}

	const posts: BlogPost[] = [];

	for (const { slug, content } of blogPostsData) {
		const post = await processMarkdown(slug, content);
		posts.push(post);
	}

	// Sort posts by date (newest first)
	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	processedPosts = posts;
	return posts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
	const posts = await getAllBlogPosts();
	return posts.find((post) => post.slug === slug) || null;
}

export function paginatePosts(posts: BlogPost[], page: number, postsPerPage: number = 6) {
	const totalPages = Math.ceil(posts.length / postsPerPage);
	const startIndex = (page - 1) * postsPerPage;
	const endIndex = startIndex + postsPerPage;

	return {
		posts: posts.slice(startIndex, endIndex),
		totalPages,
		currentPage: page,
		hasNextPage: page < totalPages,
		hasPrevPage: page > 1
	};
}
