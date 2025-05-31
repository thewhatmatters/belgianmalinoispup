const fs = require('fs');
const path = require('path');

// Load config for base URL
const config = require('./src/lib/config.ts').config;
const BASE_URL = config.defaultSiteUrl.replace(/\/$/, '');

// Slugify function (copied from src/lib/utils/slugify.ts)
function slugify(text) {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '') // Remove special characters except hyphens and spaces
		.replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
		.replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Read resources.json
const resourcesPath = path.join(__dirname, 'src/lib/data/resources.json');
const resources = JSON.parse(fs.readFileSync(resourcesPath, 'utf-8'));

// Static pages
const staticPages = [
	{ loc: '/', changefreq: 'weekly', priority: 1.0 },
	{ loc: '/faq', changefreq: 'monthly', priority: 0.7 },
	{ loc: '/privacy', changefreq: 'monthly', priority: 0.7 },
	{ loc: '/terms', changefreq: 'monthly', priority: 0.7 }
];

// Dynamic resource pages
const resourcePages = resources.map((r) => {
	const category = r.category;
	const slug = slugify(r.title);
	return {
		loc: `/${category}/${slug}`,
		changefreq: 'weekly',
		priority: 0.8,
		lastmod: new Date().toISOString().split('T')[0]
	};
});

// Build XML
function buildUrl({ loc, changefreq, priority, lastmod }) {
	return `  <url>\n    <loc>${BASE_URL}${loc}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

const urls = [
	...staticPages.map((p) => buildUrl({ ...p, lastmod: new Date().toISOString().split('T')[0] })),
	...resourcePages.map(buildUrl)
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

// Write sitemap.xml
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap, 'utf-8');
console.log('sitemap.xml generated with', urls.length, 'URLs.');
