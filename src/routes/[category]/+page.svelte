<script lang="ts">
	import { config } from '$lib/config';
	import ResourceCard from '$lib/components/ui/ResourceCard.svelte';
	import Ad from '$lib/components/ui/Ad.svelte';
	import Pagination from '$lib/components/ui/Pagination.svelte';
	import { getRandomAd, shouldDisplayAd, getAdInsertIndex } from '$lib/utils/ads';
	import type { CustomAd } from '$lib/utils/ads';
	import type { PageData } from './$types';

	export let data: PageData;
	const { category, resources: categoryResources } = data;

	let currentPage = 1;
	const itemsPerPage = 20;

	// Randomize ad on component mount
	let randomAd: CustomAd | null = null;

	// Set random ad on mount
	randomAd = getRandomAd();

	function handlePageChange(page: number) {
		currentPage = page;
		// Scroll to top when page changes
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	$: totalPages = Math.ceil(categoryResources.length / itemsPerPage);
	$: paginatedResources = categoryResources.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	// Smart ad placement logic using utility functions
	$: shouldShowAd = shouldDisplayAd(paginatedResources.length);
	$: adInsertIndex = getAdInsertIndex();

	// Format category name for display
	$: categoryName = category
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
</script>

<svelte:head>
	<title>{categoryName} | {config.siteName}</title>
	<meta
		name="description"
		content="Browse our curated collection of {categoryName.toLowerCase()} for Belgian Malinois dogs."
	/>
	<meta name="keywords" content="{category}, belgian malinois, {config.siteName}" />
</svelte:head>

<section class="container mx-auto px-4 py-12 xl:px-0">
	<h1 class="mb-6 text-2xl font-semibold">{categoryName}</h1>
	{#if paginatedResources.length > 0}
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{#each paginatedResources as resource, index}
				<!-- Insert ad at the specified row position -->
				{#if shouldShowAd && randomAd && index === adInsertIndex}
					<Ad ad={randomAd} />
				{/if}
				<ResourceCard {...resource} />
			{/each}
		</div>

		<!-- Pagination -->
		{#if totalPages > 1}
			<div class="mt-12">
				<Pagination {currentPage} {totalPages} onPageChange={handlePageChange} />
			</div>
		{/if}
	{:else}
		<div class="flex flex-col items-center justify-center py-24">
			<h3 class="text-xl font-medium">No resources found in this category.</h3>
			<a
				href="/"
				class="mt-2 rounded-full bg-slate-950 px-6 py-3 font-medium text-slate-50 transition hover:bg-slate-800"
			>
				View all resources
			</a>
		</div>
	{/if}
</section>
