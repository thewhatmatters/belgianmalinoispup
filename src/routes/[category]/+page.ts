import { error } from '@sveltejs/kit';
import resources from '$lib/data/resources.json';
import type { PageLoad } from './$types';

export const prerender = true;

// Get unique categories for prerendering
export function entries() {
	const categories = new Set(resources.map((resource) => resource.category));
	return Array.from(categories).map((category) => ({ category }));
}

export const load = (({ params }) => {
	const { category } = params;

	// Filter resources by category
	const categoryResources = resources.filter((r) => r.category === category);

	if (!categoryResources.length) {
		throw error(404, 'Category not found');
	}

	return {
		category,
		resources: categoryResources
	};
}) satisfies PageLoad;
