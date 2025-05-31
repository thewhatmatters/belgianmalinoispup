import { config } from '$lib/config';
import { slugify } from '$lib/utils/slugify';
import resources from '$lib/data/resources.json';

export const prerender = true; // For static builds

export async function GET() {
	const BASE_URL = config.defaultSiteUrl.replace(/\/$/, '');

	// Static pages
	const staticPages = [
		{ loc: '/', changefreq: 'weekly', priority: 1.0 },
		{ loc: '/faq', changefreq: 'monthly', priority: 0.7 },
		{ loc: '/privacy', changefreq: 'monthly', priority: 0.7 },
		{ loc: '/terms', changefreq: 'monthly', priority: 0.7 }
	];

	// Dynamic resource pages
	const resourcePages = resources.map((r: any) => ({
		loc: `/${r.category}/${slugify(r.title)}`,
		changefreq: 'weekly',
		priority: 0.8,
		lastmod: new Date().toISOString().split('T')[0]
	}));

	function buildUrl({ loc, changefreq, priority, lastmod }: any) {
		return `  <url>\n    <loc>${BASE_URL}${loc}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
	}

	const urls = [
		...staticPages.map((p) => buildUrl({ ...p, lastmod: new Date().toISOString().split('T')[0] })),
		...resourcePages.map(buildUrl)
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
