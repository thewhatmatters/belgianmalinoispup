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

export const load = (({ params }) => {
	const { category, slug } = params;

	// Find the resource that matches both category and slug
	const resource = resources.find((r) => r.category === category && slugify(r.title) === slug);

	if (!resource) {
		throw error(404, 'Resource not found');
	}

	return {
		resource,
		siteUrl: config.defaultSiteUrl.replace(/\/$/, '') // Remove trailing slash if present
	};
}) satisfies PageLoad;
