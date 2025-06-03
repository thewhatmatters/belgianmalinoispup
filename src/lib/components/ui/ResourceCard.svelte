<script lang="ts">
	export let title: string;
	export let description: string = '';
	export let image: string;
	export let category: string;
	export let externalUrl: string;
	export let sponsored: boolean = false;

	// Import shared slugify function
	import { slugify } from '$lib/utils/slugify';

	// For internal link using slugified title
	$: internalUrl = `/${category}/${slugify(title)}`;

	// Import icons
	import { SealCheck, Info, ArrowUpRight } from 'phosphor-svelte';

	// Navigation handlers for buttons
	function openExternal(e: Event) {
		e.stopPropagation();
		window.open(externalUrl, '_blank', 'noopener,noreferrer');
	}
	function goToInternal(e: Event) {
		e.stopPropagation();
		window.location.href = internalUrl;
	}
</script>

<div class="group w-full max-w-[364px]">
	<!-- Image area -->
	<div
		class="relative block w-full cursor-pointer overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900"
		style="aspect-ratio: 4/3;"
		tabindex="0"
		aria-label={`Open external resource: ${title}`}
		on:click={openExternal}
		on:keydown={(e) => (e.key === 'Enter' || e.key === ' ' ? openExternal(e) : null)}
		role="link"
	>
		<img
			src={image}
			alt={title}
			class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
			loading="lazy"
		/>
		<!-- Overlay on hover -->
		<div
			class="pointer-events-none absolute inset-0 z-10 bg-slate-950/50 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100 dark:bg-slate-50/60"
		></div>
		<!-- Buttons on hover -->
		<div
			class="absolute inset-0 z-20 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100"
		>
			<button
				type="button"
				class="pointer-events-auto flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-slate-50 shadow transition hover:bg-slate-800 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 focus:outline-none dark:bg-slate-50 dark:text-slate-950 dark:hover:bg-slate-200 dark:focus:ring-slate-50"
				aria-label={`Visit ${title} (opens in new tab)`}
				on:click|stopPropagation={openExternal}
			>
				Visit Resource <ArrowUpRight size={18} aria-hidden="true" />
			</button>
			<button
				type="button"
				class="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-slate-50 shadow transition hover:bg-slate-800 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 focus:outline-none dark:bg-slate-50 dark:text-slate-950 dark:hover:bg-slate-200 dark:focus:ring-slate-50"
				aria-label={`More info about ${title}`}
				on:click|stopPropagation={goToInternal}
			>
				<Info size={18} />
			</button>
		</div>
	</div>

	<!-- Title + description block (internal link) -->
	<div
		class="mt-4 block cursor-pointer select-none"
		aria-label={`Go to resource page: ${title}`}
		tabindex="0"
		on:click={goToInternal}
		on:keydown={(e) => (e.key === 'Enter' || e.key === ' ' ? goToInternal(e) : null)}
		role="link"
	>
		<div class="flex items-center gap-1 text-base font-semibold text-slate-950 dark:text-slate-50">
			{title}
			{#if sponsored}
				<SealCheck size={18} class="text-blue-600" aria-label="Sponsored" />
				<span class="sr-only">Sponsored</span>
			{/if}
		</div>
		{#if description}
			<div class="text-sm text-slate-600 dark:text-slate-300">{description}</div>
		{/if}
	</div>
</div>

<style>
	@media (max-width: 640px) {
		div.group {
			max-width: 100%;
			height: auto;
		}
		div.block.relative {
			height: auto;
			aspect-ratio: 4/3;
			min-height: 180px;
		}
	}
</style>
