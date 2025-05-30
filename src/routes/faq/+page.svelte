<script lang="ts">
	import { config } from '$lib/config';
	import Accordion from '$lib/components/ui/Accordion.svelte';

	const faqItems = [
		{
			title: 'How much does a Belgian Malinois cost?',
			content:
				'The cost of a Belgian Malinois varies depending on age, pedigree, training, and the breeder. Pet-quality puppies typically range from $1,000 to $2,500, while dogs from working or titled bloodlines can cost between $2,500 and $4,000 or more. Fully trained protection or police dogs may cost anywhere from $10,000 to $30,000 or higher.  Additional expenses include vaccinations and microchipping ($100–$300), spay or neuter surgery ($200–$600), crates and accessories ($200–$500), training classes ($100–$300 per month), and high-quality food ($50–$100 per month).  It is important to work with a reputable breeder who provides health clearances and properly socializes their puppies. Avoid deals that seem too good to be true, as they may come from puppy mills or irresponsible sources.'
		},
		{
			title: 'How long do Belgian Malinois live?',
			content:
				'Belgian Malinois typically live 12 to 14 years with proper care. They are generally a healthy, active breed, but their lifespan can be influenced by factors like diet, exercise, genetics, and regular veterinary care. Common health concerns include hip dysplasia, elbow dysplasia, and progressive retinal atrophy. Providing a balanced diet, mental stimulation, physical activity, and routine checkups can help ensure a long, healthy life.'
		},
		{
			title: 'Are Belgian Malinois aggressive?',
			content:
				'Belgian Malinois are not naturally aggressive, but they are a high-energy, protective breed with strong working instincts. Without proper training, socialization, and daily mental and physical stimulation, they can develop behavioral issues, including aggression. However, with consistent guidance and early exposure to different people and environments, they are loyal, obedient, and confident dogs. They are best suited for experienced owners who can provide structure and purpose.'
		},
		{
			title: 'How big do Belgian Malinois get?',
			content:
				'Belgian Malinois typically grow to be 22 to 26 inches tall at the shoulder and weigh between 40 to 80 pounds, with males usually being larger than females. They have a lean, athletic build designed for speed, agility, and endurance, making them ideal for active work and high-intensity environments.'
		},
		{
			title: 'Are Belgian Malinois easy to train?',
			content:
				'Belgian Malinois are considered highly trainable due to their intelligence, focus, and eagerness to work, which is why they’re commonly used in police and military roles. However, their high energy and intensity require consistent, experienced handling, making them best suited for owners who can provide structured training, mental stimulation, and regular physical activity.'
		}
	];
</script>

<svelte:head>
	<title>FAQ | {config.siteName}</title>
	<meta
		name="description"
		content="Frequently asked questions about our resource directory. Find answers to common questions about our curated collection of tools and resources."
	/>
	<meta
		name="keywords"
		content="FAQ, frequently asked questions, help, resources, directory, tools"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="FAQ | {config.siteName}" />
	<meta
		property="og:description"
		content="Frequently asked questions about our resource directory. Find answers to common questions about our curated collection of tools and resources."
	/>

	<!-- Twitter -->
	<meta property="twitter:card" content="summary" />
	<meta property="twitter:title" content="FAQ | {config.siteName}" />
	<meta
		property="twitter:description"
		content="Frequently asked questions about our resource directory. Find answers to common questions about our curated collection of tools and resources."
	/>
</svelte:head>

<main
	class="container mx-auto max-w-[900px] px-4 py-12 xl:px-0 xl:py-24 dark:bg-slate-950 dark:text-slate-50"
>
	<!-- Header -->
	<h1 class="mb-4 text-4xl font-normal text-slate-950 dark:text-slate-50">
		Frequently Asked Questions
	</h1>

	<!-- FAQ Accordion -->
	<div class="prose prose-slate max-w-none">
		<Accordion items={faqItems} />
	</div>
</main>
