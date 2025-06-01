<script lang="ts">
	export let active: boolean = false;
	export let leftIcon: any = null;
	export let rightIcon: any = null;
	export let disabled: boolean = false;
	export let onclick: ((e: MouseEvent) => void) | undefined = undefined;
	export let ariaLabel: string | undefined = undefined;

	function handleClick(e: MouseEvent) {
		if (disabled) return;
		onclick?.(e);
	}
</script>

<button
	type="button"
	aria-label={ariaLabel}
	class={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-all duration-300
    ${
			active
				? 'bg-slate-950 text-slate-50 dark:bg-slate-50 dark:text-slate-950'
				: 'border border-slate-200 bg-slate-50 text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50'
		}
    hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none
    disabled:pointer-events-none disabled:opacity-50`}
	{disabled}
	on:click={handleClick}
>
	{#if leftIcon}
		<span class="flex items-center">
			<svelte:component this={leftIcon.component} {...leftIcon.props} />
		</span>
	{/if}
	<slot />
	{#if rightIcon}
		<span class="flex items-center">
			<svelte:component this={rightIcon.component} {...rightIcon.props} />
		</span>
	{/if}
</button>
