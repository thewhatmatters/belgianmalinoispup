<script lang="ts">
	import { Minus, Plus } from 'phosphor-svelte';
	import { slide } from 'svelte/transition';

	export let items: Array<{
		title: string;
		content: string;
	}> = [];

	let openIndex: number | null = 0;

	function toggleItem(index: number) {
		openIndex = openIndex === index ? null : index;
	}
</script>

<ul>
	{#each items as item, index}
		<li class="mb-11">
			<div
				class="flex w-full items-start justify-between py-2 text-left transition-colors duration-200 hover:cursor-pointer"
				role="button"
				tabindex="0"
				on:click={() => toggleItem(index)}
				on:keydown={(e) => (e.key === 'Enter' || e.key === ' ' ? toggleItem(index) : null)}
				aria-expanded={openIndex === index}
				aria-controls="accordion-content-{index}"
			>
				<h3 class="pr-4 text-lg font-semibold text-slate-950 dark:text-slate-50">
					{item.title}
				</h3>
				{#if openIndex === index}
					<Minus size={20} class="flex-shrink-0 text-slate-600 dark:text-slate-400" />
				{:else}
					<Plus size={20} class="flex-shrink-0 text-slate-600 dark:text-slate-400" />
				{/if}
			</div>

			<!-- Accordion Content -->
			{#if openIndex === index}
				<div
					id="accordion-content-{index}"
					class="max-w-full md:max-w-[80%]"
					transition:slide={{ duration: 300 }}
				>
					<p class="text-base leading-relaxed text-slate-600 dark:text-slate-200">
						{@html item.content}
					</p>
				</div>
			{/if}
		</li>
	{/each}
</ul>
