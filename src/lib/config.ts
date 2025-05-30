// Site configuration - customize these values for your deployment
export const config = {
	siteName: 'Belgian Malinois Directory',
	siteDescription:
		'Your trusted resource for finding reputable breeders, expert training guides, and essential care tips for Belgian Malinois dogs. Whether you’re searching for a puppy, looking to train your Malinois, or need trusted gear recommendations, we help you connect with the best.',
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
				image: '/ads/impact-dog-crates.png',
				url: 'https://www.impactdogcrates.com/malipup'
			}
		],
		// Google Ads configuration (for future use)
		googleAds: {
			enabled: false,
			adSlotId: '', // Will be set when Google Ads is implemented
			frequency: 0.3 // 30% chance to show Google Ad vs custom ad
		}
	}
};
