<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { EnvelopeSimple, PawPrint, List, X } from 'phosphor-svelte';
	import { page } from '$app/stores';
	import { config } from '$lib/config';
	import { slide } from 'svelte/transition';

	let mobileMenuOpen = false;

	function toggleMobileMenu(e: MouseEvent) {
		e.stopPropagation();
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function handleClickOutside(event: Event) {
		const target = event.target as Element;
		if (
			mobileMenuOpen &&
			!target.closest('.mobile-menu') &&
			!target.closest('.mobile-menu-button')
		) {
			mobileMenuOpen = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<nav class="sticky top-0 z-40 w-full bg-white py-4 shadow-xs dark:bg-slate-950">
	<div class="container mx-auto flex items-center justify-between px-4 xl:px-0">
		<div class="flex items-center gap-4 sm:gap-8">
			<a
				href="/"
				class="flex items-center gap-1 text-lg font-medium text-slate-950 transition-colors duration-300 hover:text-slate-700 sm:gap-2 dark:text-slate-50 hover:dark:text-slate-100"
				on:click={closeMobileMenu}
			>
				<PawPrint size={24} />
				<span class="block text-base sm:text-lg">{config.siteName}</span>
			</a>

			<ul class="hidden gap-8 md:flex">
				<li>
					<a
						href="/"
						class={`text-base font-normal transition-all duration-300 ${$page.url.pathname === '/' ? 'text-slate-950 underline underline-offset-4 dark:text-slate-50' : 'text-slate-600 hover:text-slate-950 dark:text-slate-100 hover:dark:text-slate-50'}`}
					>
						Directory
					</a>
				</li>
				<li>
					<a
						href="/blog"
						class={`text-base font-normal transition-all duration-300 ${$page.url.pathname === '/blog' || $page.url.pathname.startsWith('/blog/') ? 'text-slate-950 underline underline-offset-4 dark:text-slate-50' : 'text-slate-600 hover:text-slate-950 dark:text-slate-100 hover:dark:text-slate-50'}`}
					>
						Blog
					</a>
				</li>
				<li>
					<a
						href="/faq"
						class={`text-base font-normal transition-all duration-300 ${$page.url.pathname === '/faq' ? 'text-slate-950 underline underline-offset-4 dark:text-slate-50' : 'text-slate-600 hover:text-slate-950 dark:text-slate-100 hover:dark:text-slate-50'}`}
					>
						FAQ
					</a>
				</li>
			</ul>
		</div>

		<div class="flex items-center gap-4">
			<div class="hidden md:block">
				<Button
					variant="primary"
					size="md"
					href="mailto:{config.contactEmail}?subject=Belgian Malinois Directory"
					leftIcon={{ component: EnvelopeSimple, props: { size: 16 } }}
				>
					Contact
				</Button>
			</div>

			<button
				type="button"
				class="mobile-menu-button flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-950 md:hidden"
				on:click={toggleMobileMenu}
				aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={mobileMenuOpen}
				aria-controls="mobile-menu"
			>
				{#if mobileMenuOpen}
					<X size={24} />
				{:else}
					<List size={24} />
				{/if}
			</button>
		</div>
	</div>

	{#if mobileMenuOpen}
		<div
			id="mobile-menu"
			class="mobile-menu fixed inset-x-0 top-[60px] border-t border-slate-200 bg-white md:hidden"
			transition:slide={{ duration: 200 }}
		>
			<div class="container mx-auto px-4 xl:px-0">
				<div class="space-y-1 py-4">
					<a
						href="/"
						class={`block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 ${$page.url.pathname === '/' ? 'bg-slate-100 text-slate-950' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`}
						on:click={closeMobileMenu}
					>
						Directory
					</a>
					<a
						href="/blog"
						class={`block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 ${$page.url.pathname === '/blog' || $page.url.pathname.startsWith('/blog/') ? 'bg-slate-100 text-slate-950' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`}
						on:click={closeMobileMenu}
					>
						Blog
					</a>
					<a
						href="/faq"
						class={`block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 ${$page.url.pathname === '/faq' ? 'bg-slate-100 text-slate-950' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`}
						on:click={closeMobileMenu}
					>
						FAQ
					</a>
				</div>
			</div>
		</div>
	{/if}
</nav>

<style>
	.mobile-menu-button {
		transition: all 0.2s ease-in-out;
	}
	.mobile-menu {
		transition: all 0.2s ease-in-out;
	}
</style>
