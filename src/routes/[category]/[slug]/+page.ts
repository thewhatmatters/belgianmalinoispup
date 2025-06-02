import { error } from '@sveltejs/kit';
import { slugify } from '$lib/utils/slugify';
import { config } from '$lib/config';
import resources from '$lib/data/resources.json';
import type { PageLoad } from './$types';

export const prerender = true;

// This function generates all possible category/slug combinations for prerendering
export function entries() {
	return resources.map((resource) => ({
		category: resource.category,
		slug: slugify(resource.title)
	}));
}

export const load: PageLoad = ({ params, url }) => {
	const { category, slug } = params;

	// Find the resource that matches both category and slugified title
	const resource = resources.find((r) => r.category === category && slugify(r.title) === slug);

	if (!resource) {
		throw error(404, 'Resource not found');
	}

	return {
		resource,
		siteUrl: url.origin || config.defaultSiteUrl
	};
};
