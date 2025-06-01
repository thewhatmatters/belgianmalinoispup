<script lang="ts">
	// No props needed; use slot for flexibility
	let scrollEl: HTMLDivElement;
	let isDown = false;
	let startX: number;
	let scrollLeft: number;
	let showLeft = false;
	let showRight = false;

	function handleMouseDown(e: MouseEvent) {
		isDown = true;
		scrollEl.classList.add('dragging');
		startX = e.pageX - scrollEl.offsetLeft;
		scrollLeft = scrollEl.scrollLeft;
	}

	function handleMouseLeave() {
		isDown = false;
		scrollEl.classList.remove('dragging');
	}

	function handleMouseUp() {
		isDown = false;
		scrollEl.classList.remove('dragging');
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isDown) return;

		const x = e.pageX - scrollEl.offsetLeft;
		const walk = (x - startX) * 1.5; // scroll speed

		// Only prevent default if actually walking (dragging)
		if (Math.abs(walk) > 5) {
			// Threshold of 5 pixels, adjust as needed
			e.preventDefault();
		}
		scrollEl.scrollLeft = scrollLeft - walk;
	}

	function updateGradients() {
		if (!scrollEl) return;
		showLeft = scrollEl.scrollLeft > 0;
		showRight = scrollEl.scrollLeft + scrollEl.clientWidth < scrollEl.scrollWidth - 1;
	}

	// Update gradients on scroll and resize
	$: scrollEl && (scrollEl.onscroll = updateGradients);
	$: scrollEl && (window.onresize = updateGradients);
	// Also update on mount
	import { onMount } from 'svelte';
	onMount(() => {
		updateGradients();
	});

	export let hideGradients: boolean = false;
</script>

<section
	class="sticky top-[68px] z-30 w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
>
	<div class="container mx-auto flex items-center gap-3 px-4 py-4 xl:px-0">
		<!-- Fixed search icon/input -->
		<slot name="search" />
		<!-- Horizontally scrollable chips area -->
		<div class="relative min-w-0 flex-1">
			<div
				bind:this={scrollEl}
				role="toolbar"
				tabindex="0"
				class="scrollbar-hide overflow-x-auto whitespace-nowrap"
				on:mousedown={handleMouseDown}
				on:mouseleave={handleMouseLeave}
				on:mouseup={handleMouseUp}
				on:mousemove={handleMouseMove}
			>
				<div class="inline-flex gap-3">
					<slot />
				</div>
				{#if !hideGradients && showLeft}
					<div
						class="pointer-events-none absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-white/90 to-transparent dark:from-slate-950/90"
					></div>
				{/if}
			</div>
			{#if !hideGradients && showRight}
				<div
					class="pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white/90 to-transparent dark:from-slate-950/90"
				></div>
			{/if}
		</div>
	</div>
</section>

<style>
	/* Hide scrollbar for Webkit browsers */
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
	/* Hide scrollbar for IE, Edge and Firefox */
	.scrollbar-hide {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
	:global(.dragging) {
		cursor: grabbing;
		cursor: -webkit-grabbing;
		user-select: none;
	}
</style>
