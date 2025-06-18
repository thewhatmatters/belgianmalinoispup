<script lang="ts">
	import { onMount } from 'svelte';

	// Google Ads component for future implementation
	export let adSlotId: string;
	export let adFormat: string = 'auto'; // auto | horizontal | vertical | rectangle

	let adContainer: HTMLElement;
	let adElement: HTMLElement;
	let adLoaded = false;
	let adFailed = false;

	onMount(() => {
		// Wait a bit for the page to settle
		setTimeout(() => {
			initializeAd();
		}, 100);

		// Set a timeout to check if ad loaded
		setTimeout(() => {
			checkAdStatus();
		}, 3000);
	});

	function initializeAd() {
		if (typeof window !== 'undefined' && window.adsbygoogle && adElement) {
			try {
				(window.adsbygoogle = window.adsbygoogle || []).push({});

				// Check if ad has content after a short delay
				setTimeout(() => {
					if (adElement && adElement.innerHTML.trim() !== '') {
						adLoaded = true;
					}
				}, 1000);
			} catch (e) {
				console.error('AdSense error:', e);
				adFailed = true;
			}
		}
	}

	function checkAdStatus() {
		if (!adLoaded && adElement) {
			// Check if the ad element has any meaningful content
			const hasContent = adElement.innerHTML.trim() !== '' && adElement.offsetHeight > 0;

			if (!hasContent) {
				adFailed = true;
			} else {
				adLoaded = true;
			}
		}
	}
</script>

<!-- Only show container if ad loads successfully, otherwise show nothing -->
{#if !adFailed}
	<div class="col-span-full" bind:this={adContainer}>
		<ins
			bind:this={adElement}
			class="adsbygoogle"
			style="display:block; min-height:0;"
			data-ad-client="ca-pub-6372188459026911"
			data-ad-slot={adSlotId}
			data-ad-format={adFormat}
			data-full-width-responsive="true"
		></ins>
	</div>
{/if}

<!-- Future Google Ads implementation will go here -->
<!-- 
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXX"
     data-ad-slot="{adSlotId}"
     data-ad-format="{adFormat}"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
-->
