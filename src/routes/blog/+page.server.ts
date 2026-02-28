import { getAllBlogPosts } from '\$lib/services/blog';
import type { PageServerLoad } from './\$types';

export const load: PageServerLoad = async () => {
	const allPosts = await getAllBlogPosts();

	return {
		allPosts
	};
};
