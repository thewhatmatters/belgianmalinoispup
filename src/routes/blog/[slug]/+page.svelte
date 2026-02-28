<script lang="ts">
	import { Calendar, Clock, User } from 'phosphor-svelte';
	import { formatDate } from '\$lib/utils/markdown';
	import type { PageData } from './\$types';

	export let data: PageData;
	$: post = data.post;

	// Generate breadcrumb items
	$: breadcrumbItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Blog', href: '/blog' },
		{ label: post.title, current: true }
	];
</script>

<svelte:head>
	<title>{post.title} - BelgianMalinoisPup.com Blog</title>
	<meta name="description" content={post.description} />
	<meta property="og:title" content="{post.title} - BelgianMalinoisPup.com Blog" />
	<meta property="og:description" content={post.description} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://belgianmalinoispup.com/blog/{post.slug}" />
	{#if post.image}
		<meta property="og:image" content={post.image} />
	{/if}
	<meta property="article:published_time" content={post.date} />
	{#if post.author}
		<meta property="article:author" content={post.author} />
	{/if}
	{#if post.tags}
		{#each post.tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{post.title} - BelgianMalinoisPup.com Blog" />
	<meta name="twitter:description" content={post.description} />
	{#if post.image}
		<meta name="twitter:image" content={post.image} />
	{/if}
</svelte:head>

<main class="container mx-auto max-w-[900px] px-4 py-12 lg:px-0 lg:py-24">
	<!-- Breadcrumbs -->
	<nav aria-label="Breadcrumb" class="mb-8">
		<ol class="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
			{#each breadcrumbItems as item, index}
				<li class="flex items-center">
					{#if index > 0}
						<span class="mx-2">/</span>
					{/if}
					{#if item.current}
						<span aria-current="page" class="text-slate-950 dark:text-slate-50">{item.label}</span>
					{:else}
						<a href={item.href} class="hover:text-slate-950 dark:hover:text-slate-50">{item.label}</a>
					{/if}
				</li>
			{/each}
		</ol>
	</nav>

	<article>
		<!-- Image section -->
		{#if post.image}
			<div class="mb-8">
				<div class="relative overflow-hidden rounded-xl bg-slate-100">
					<img
						src={post.image}
						alt={post.title}
						class="h-auto w-full object-cover"
						style="aspect-ratio: 4/3;"
						loading="eager"
					/>
				</div>
			</div>
		{/if}

		<!-- Header -->
		<header class="mb-8">
			<h1 class="mb-4 text-3xl font-bold text-slate-950 lg:text-4xl dark:text-slate-50">
				{post.title}
			</h1>

			<div class="mb-6 flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400">
				<div class="flex items-center gap-2">
					<Calendar size={20} />
					<time datetime={post.date}>{formatDate(post.date)}</time>
				</div>

				{#if post.readingTime}
					<div class="flex items-center gap-2">
						<Clock size={20} />
						<span>{post.readingTime} min read</span>
					</div>
				{/if}

				{#if post.author}
					<div class="flex items-center gap-2">
						<User size={20} />
						<span>{post.author}</span>
					</div>
				{/if}
			</div>
		</header>

		<!-- Content -->
		<div
			class="blog-content text-md max-w-full leading-6 font-normal text-slate-600 md:max-w-[80%] dark:text-slate-300"
			>
			{@html post.content}
		</div>
	</article>
</main>
