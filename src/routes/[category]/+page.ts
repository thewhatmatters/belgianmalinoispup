import type { PageLoad } from './$types';
import resources from '$lib/data/resources.json';

export const prerender = true;

// Get unique categories for prerendering
export function entries() {
	const categories = new Set(resources.map((resource) => resource.category));
	return Array.from(categories).map((category) => ({ category }));
}

export const load: PageLoad = ({ params }) => {
	const { category } = params;
	const categoryResources = resources.filter((resource) => resource.category === category);

	return {
		category,
		resources: categoryResources
	};
};
