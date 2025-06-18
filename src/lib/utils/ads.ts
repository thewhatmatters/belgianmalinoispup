import { config } from '$lib/config';

export type CustomAd = {
	id: string;
	image: string;
	url: string;
};

export type GoogleAd = {
	id: 'google-ad';
	type: 'google';
	adSlotId: string;
};

export type AdData = CustomAd | GoogleAd;

/**
 * Get a random ad from the available pool
 * Now only returns custom ads since Google Auto Ads handles automatic placement
 */
export function getRandomAd(): CustomAd | null {
	const { customAds } = config.ads;

	// If no custom ads available, return null
	if (!customAds || customAds.length === 0) {
		return null;
	}

	// Select random custom ad (Google Auto Ads handles automatic placement)
	const randomIndex = Math.floor(Math.random() * customAds.length);
	return customAds[randomIndex];
}

/**
 * Get a Google Ad specifically
 */
export function getGoogleAd(): GoogleAd | null {
	const { googleAds } = config.ads;

	if (!googleAds.enabled) {
		return null;
	}

	return {
		id: 'google-ad',
		type: 'google',
		adSlotId: googleAds.adSlotId
	};
}

/**
 * Check if ad should be displayed based on configuration
 */
export function shouldDisplayAd(resourceCount: number): boolean {
	const { enabled, placementRow, itemsPerRow } = config.ads;
	return enabled && resourceCount > placementRow * itemsPerRow;
}

/**
 * Calculate the index where ad should be inserted
 */
export function getAdInsertIndex(): number {
	const { placementRow, itemsPerRow } = config.ads;
	return placementRow * itemsPerRow;
}
