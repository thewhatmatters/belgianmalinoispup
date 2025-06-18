// Site configuration - customize these values for your deployment
export const config = {
	siteName: 'Belgian Malinois Directory',
	siteDescription:
		"Your trusted resource for finding reputable breeders, expert training guides, and essential care tips for Belgian Malinois dogs. Whether you're searching for a puppy, looking to train your Malinois, or need trusted gear recommendations, we help you connect with the best.",
	// Default site URL - update this for your domain
	defaultSiteUrl: 'https://belgianmalinoispup.com/',
	contactEmail: 'hqdirectory@gmail.com',
	// Ad placement configuration
	ads: {
		enabled: true,
		// Directory page ads
		placementRow: 1, // Insert ad after this row (1-based)
		itemsPerRow: 4, // Should match your grid columns (lg:grid-cols-4)
		// Individual resource page ads
		showOnResourcePages: true, // Enable/disable ads on individual resource pages
		// Custom ads pool - randomly selected
		customAds: [
			{
				id: 'impact-dog-crates',
				image: '/ads/impact-dog-crates.avif',
				url: 'https://www.impactdogcrates.com/malipup'
			},
			{
				id: 'custom-og',
				image: '/ads/custom-og.png',
				url: 'https://customog.com?ref=hqdirectory'
			}
		],
		// Google Ads configuration
		googleAds: {
			enabled: false, // Using Auto Ads instead - Google places ads automatically
			adSlotId: '5218673632',
			frequency: 0.1 // Not used with Auto Ads
		}
	}
};
