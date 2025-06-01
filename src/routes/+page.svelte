<script lang="ts">
	import Hero from '$lib/components/layout/Hero.svelte';
	import { config } from '$lib/config';

	import FilterBar from '$lib/components/layout/FilterBar.svelte';
	import Chip from '$lib/components/ui/Chip.svelte';
	import ResourceCard from '$lib/components/ui/ResourceCard.svelte';
	import Ad from '$lib/components/ui/Ad.svelte';
	import Pagination from '$lib/components/ui/Pagination.svelte';
	import resources from '$lib/data/resources.json';
	import { getRandomAd, shouldDisplayAd, getAdInsertIndex } from '$lib/utils/ads';
	import type { CustomAd } from '$lib/utils/ads';
	import {
		LegoSmiley,
		PawPrint,
		BookmarksSimple,
		YoutubeLogo,
		MagnifyingGlass,
		X
	} from 'phosphor-svelte';

	// Example: filter options as an array
	const filters = [
		{ label: 'Accessories', icon: LegoSmiley, category: 'accessories' },
		{ label: 'Breeders', icon: PawPrint, category: 'breeders' },
		{ label: 'Resources', icon: BookmarksSimple, category: 'resources' },
		{ label: 'Videos', icon: YoutubeLogo, category: 'videos' }
	];

	const allResources = resources;

	let selectedCategory = '';
	let currentPage = 1;
	const itemsPerPage = 20;

	// Randomize ad on component mount
	let randomAd: CustomAd | null = null;

	// Set random ad on mount
	randomAd = getRandomAd();

	let searchMode = false;
	let searchQuery = '';
	let previousSearchQuery = '';
	let searchInput: HTMLInputElement | null = null;

	function clearSearch() {
		searchQuery = '';
		previousSearchQuery = '';
		searchMode = false;
		currentPage = 1;
	}

	$: searchActive = searchQuery.trim().length > 0;

	// Reset pagination only when search query actually changes
	$: if (searchQuery !== previousSearchQuery) {
		currentPage = 1;
		previousSearchQuery = searchQuery;
	}

	function selectFilter(category: string) {
		selectedCategory = selectedCategory === category ? '' : category;
		currentPage = 1; // Reset to first page when filtering
	}

	function handlePageChange(page: number) {
		currentPage = page;
		// Scroll to top when page changes
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	$: filteredResources = searchActive
		? allResources.filter((r: any) => {
				const q = searchQuery.toLowerCase();
				return (
					r.title.toLowerCase().includes(q) ||
					r.description.toLowerCase().includes(q) ||
					r.category.toLowerCase().includes(q)
				);
			})
		: selectedCategory
			? allResources.filter(
					(r: any) => String(r.category).trim() === String(selectedCategory).trim()
				)
			: allResources;

	$: totalPages = Math.ceil(filteredResources.length / itemsPerPage);
	$: paginatedResources = filteredResources.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	$: selectedLabel = searchActive
		? `Results for "${searchQuery}"`
		: selectedCategory
			? (filters.find((f) => f.category === selectedCategory)?.label ?? 'All Resources')
			: 'All Resources';

	// Smart ad placement logic using utility functions
	$: shouldShowAd = shouldDisplayAd(paginatedResources.length);
	$: adInsertIndex = getAdInsertIndex();

	$: if (searchMode && searchInput) searchInput.focus();
</script>

<svelte:head>
	<!-- Primary SEO -->
	<title>{config.siteName} | Resource Directory</title>
	<meta name="description" content={config.siteDescription} />
	<meta
		name="keywords"
		content="resources, tools, directory, productivity, creativity, startups, AI, web3, design, development"
	/>
	<meta name="author" content={config.siteName} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={`${config.siteName} | Resource Directory`} />
	<meta property="og:description" content={config.siteDescription} />
	<meta property="og:site_name" content={config.siteName} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content={`${config.siteName} | Resource Directory`} />
	<meta property="twitter:description" content={config.siteDescription} />

	<!-- Additional SEO -->
	<meta name="robots" content="index, follow" />
	<meta name="googlebot" content="index, follow" />

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "${config.siteName}",
		"description": "${config.siteDescription}",
		"url": "${config.defaultSiteUrl}",
		"potentialAction": {
			"@type": "SearchAction",
			"target": {
				"@type": "EntryPoint",
				"urlTemplate": "${config.defaultSiteUrl}/?q={search_term_string}"
			},
			"query-input": "required name=search_term_string"
		},
		"publisher": {
			"@type": "Organization",
			"name": "${config.siteName}",
			"url": "${config.defaultSiteUrl}"
		}
	}
	</script>`}
</svelte:head>

<Hero align="left" background="/hero.png" backgroundMobile="/hero-mobile.png">
	<h1 class="mb-2 text-2xl font-medium text-slate-950 mix-blend-difference md:text-4xl">
		Belgian Malinois Directory
	</h1>
	<p class="max-w-lg text-sm font-light text-slate-700 mix-blend-difference md:text-lg">
		Your trusted resource for Belgian Malinois breeders, training tips, and essential care.
	</p>
</Hero>
<FilterBar hideGradients={searchMode}>
	<svelte:fragment slot="search">
		{#if !searchMode}
			<button type="button" aria-label="Open search" class="inline-block">
				<Chip
					leftIcon={{ component: MagnifyingGlass, props: { size: 18 } }}
					active={searchActive}
					onclick={() => {
						searchMode = true;
					}}
				/>
			</button>
		{:else}
			<div class="flex w-full items-center gap-3">
				<button type="button" aria-label="Close search" class="inline-block">
					<Chip
						leftIcon={{ component: X, props: { size: 20 } }}
						active={true}
						onclick={clearSearch}
					/>
				</button>
				<input
					class="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50"
					type="text"
					placeholder="Search resources..."
					bind:value={searchQuery}
					bind:this={searchInput}
					on:keydown={(e) => {
						if (e.key === 'Escape') clearSearch();
					}}
					style="min-width: 0;"
				/>
			</div>
		{/if}
	</svelte:fragment>
	{#each filters as { label, icon, category }}
		<Chip
			leftIcon={{ component: icon, props: { size: 18 } }}
			active={selectedCategory === category && !searchActive}
			onclick={() => selectFilter(category)}
			disabled={searchActive}
		>
			{label}
		</Chip>
	{/each}
</FilterBar>

<section class="container mx-auto px-4 py-12 xl:px-0">
	<h2 class="mb-6 text-xl font-semibold">
		{selectedLabel}
	</h2>
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
			<h3 class="text-xl font-medium">
				{searchActive ? `No resources found for "${searchQuery}"` : 'No resources yet.'}
			</h3>
			{#if searchActive}
				<button
					class="mt-2 rounded-full bg-slate-950 px-6 py-3 font-medium text-slate-50 transition hover:bg-slate-800"
					on:click={clearSearch}
				>
					Clear search
				</button>
			{:else}
				<button
					class="mt-2 rounded-full bg-slate-950 px-6 py-3 font-medium text-slate-50 transition hover:bg-slate-800"
					on:click={() => (selectedCategory = '')}
				>
					View all resources
				</button>
			{/if}
		</div>
	{/if}
</section>
