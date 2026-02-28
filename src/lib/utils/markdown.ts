import { marked } from 'marked';
import matter from 'gray-matter';

export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags?: string[];
	author?: string;
	image?: string;
	content: string;
	excerpt?: string;
	readingTime?: number;
}

// Configure marked options for better HTML output
marked.setOptions({
	breaks: true,
	gfm: true
});

// Calculate reading time (average 200 words per minute)
function calculateReadingTime(content: string): number {
	const wordsPerMinute = 200;
	const words = content.trim().split(/\s+/).length;
	return Math.ceil(words / wordsPerMinute);
}

// Generate excerpt from content
function generateExcerpt(content: string, maxLength: number = 160): string {
	const text = content.replace(/[#*`_~]/g, '').trim();
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength).trim() + '...';
}

// Process markdown content
export async function processMarkdown(slug: string, markdownContent: string): Promise<BlogPost> {
	const { data: frontmatter, content } = matter(markdownContent);
	const htmlContent = await marked(content);

	return {
		slug,
		title: frontmatter.title || 'Untitled',
		description: frontmatter.description || generateExcerpt(content),
		date: frontmatter.date || new Date().toISOString(),
		tags: frontmatter.tags || [],
		author: frontmatter.author || 'BelgianMalinoisPup.com Team',
		image: frontmatter.image || null,
		content: htmlContent,
		excerpt: frontmatter.excerpt || generateExcerpt(content, 200),
		readingTime: calculateReadingTime(content)
	};
}

// Format date for display
export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}
