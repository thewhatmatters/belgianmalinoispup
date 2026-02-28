import { getBlogPostBySlug } from '$lib/services/blog';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const post = await getBlogPostBySlug(params.slug);

	if (!post) {
		throw error(404, 'Blog post not found');
	}

	return {
		post
	};
};
