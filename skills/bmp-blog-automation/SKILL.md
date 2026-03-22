---
name: bmp-blog-automation
description: Full playbook for writing, publishing, and maintaining blog posts on BelgianMalinoisPup.com — research, writing, images, registration, and git deploy.
version: 1.0.0
author: conan
project: belgianmalinoispup.com
enabled: true
tags:
  - blog
  - content
  - belgianmalinoispup
  - automation
---

# BelgianMalinoisPup.com Blog Automation — Full Playbook

---

## Project Location

```
~/Development/belgianmalinoispup/
```

---

## File Paths (CRITICAL)

| Asset | Path |
|---|---|
| Blog posts | `src/lib/content/blog/[slug].md` |
| Registration | `src/lib/services/blog.ts` |
| Images | `static/images/blog/YYYY-MM/` |

**No `usedImages.ts` and no `prerender-config.cjs`** — this project uses `adapter-vercel` which handles routing automatically. Deduplication is done by inspecting existing post frontmatter.

---

## Existing Posts (do NOT duplicate these topics)

| Slug | Title | Date |
|---|---|---|
| `first-time-owner-truth` | The Truth About Belgian Malinois for First-Time Owners | 2026-02-28 |
| `is-malinois-right-for-you` | Is a Belgian Malinois Right for You? | 2026-03-02 |
| `belgian-malinois-exercise-needs` | Belgian Malinois Exercise Needs | 2026-03-18 |

---

## Existing Images (available for reuse)

**2026-02/**
- `malinois-portrait.avif`
- `malinois-puppy.avif`
- `malinois-standing.avif`

**2026-03/**
- `malinois-agility.avif`
- `malinois-fetch.avif`
- `malinois-protection.avif`
- `malinois-puppy-young.avif`
- `malinois-running.avif`
- `malinois-teddy.avif`

---

## Step 1: Research

### Automatic mode (no topic given)

Use the `last30days` skill with breed-specific queries:

```
last30days "Belgian Malinois ownership tips 2026"
last30days "Belgian Malinois training advice reddit"
last30days "Belgian Malinois health care guide"
```

Also check r/BelgianMalinois for high-engagement threads.

### Manual mode (user gives topic)

```
last30days "[USER_TOPIC] Belgian Malinois"
```

### Topic selection criteria

- Not already covered by existing posts (check table above)
- High community engagement signals (upvotes, comments)
- Actionable for owners or prospective owners
- Avoid overly niche or highly technical topics (keep accessible)

Good topic categories:
- Training & behavior
- Health & nutrition
- Puppy care & socialization
- Exercise & enrichment
- Breed comparisons
- Working dog / sport dog
- Common owner mistakes

---

## Step 2: Write the Blog Post

### Frontmatter template

```yaml
---
title: 'Engaging Title (60-70 chars for SEO)'
description: 'Meta description for SEO (150-160 chars)'
date: 'YYYY-MM-DD'
author: 'BelgianMalinoisPup.com Team'
image: '/images/blog/YYYY-MM/descriptive-name.avif'
excerpt: 'Short preview (under 200 chars)'
tags: ['training', 'health', 'breed']
---
```

### Content structure

```markdown
# [Title]

## Introduction
Hook with why this matters for Malinois owners specifically. Reference what makes this breed unique.

## Section 1: The Core Topic
- Breed-specific facts
- What owners commonly get wrong
- What the research / community says

## Section 2: Practical Guidance
- Step-by-step tips
- What to watch for
- Common mistakes to avoid

## Section 3: Going Deeper
- Advanced considerations
- When to consult a professional
- Resources for further learning

## Conclusion
CTA: Explore the BelgianMalinoisPup.com resource directory for more.
```

### Style guide

- Tone: Knowledgeable, direct, community-focused — not preachy
- Length: 800–1,200 words
- Voice: 2nd person ("you'll find", "your Malinois")
- Embed images inline — one near top, one mid-body, one near end
- No AI disclaimers, no "in conclusion"
- Use specific breed terminology and real scenarios — not generic dog content

---

## Step 3: Images

All images must be `.avif` format. This project does **not** use a `usedImages.ts` registry.

### 3a. Check existing images first

Review the existing image inventory above. Reuse any image that fits the post content before downloading new ones.

**Deduplication rule:** Check all existing post frontmatter `image:` fields to avoid reusing the same image across posts.

```bash
grep -r "^image:" ~/Development/belgianmalinoispup/src/lib/content/blog/
```

### 3b. Search for new images (only if existing don't fit)

Priority order: **Pexels → Wikimedia Commons → Unsplash**

Use Brave Image Search with content-specific queries:

```
GET https://api.search.brave.com/res/v1/images/search?q={query}&count=10
Headers:
  Accept: application/json
  Accept-Encoding: gzip
  X-Subscription-Token: {BRAVE_API_KEY}
```

Example queries (be specific to the blog content):
- `"Belgian Malinois training agility"`
- `"Belgian Malinois puppy socialization"`
- `"Belgian Malinois owner walking"`

Filter candidates:
- `width >= 1200px`
- Format: `jpeg`, `png`, or `webp` (no SVG/GIF)
- Prefer CC0 / public domain / open license
- Skip any filename already used in existing post frontmatter

### 3c. Download via Scrapling

```python
from scrapling import Fetcher

fetcher = Fetcher(auto_match=False)
response = fetcher.get(image_url, stealthy_headers=True, follow_redirects=True)

with open(f"{slug}-{n}.jpg", "wb") as f:
    f.write(response.content)
```

- If Scrapling fails (403, timeout), skip and try next candidate — do not retry same URL

### 3d. Convert to AVIF

```bash
ffmpeg -i input.jpg -c:v libavc1 output.avif
```

- Verify `.avif` is non-zero before proceeding
- Delete original `.jpg` only after successful `.avif` conversion
- Move final `.avif` to `static/images/blog/YYYY-MM/`

### 3e. Name convention

Use descriptive kebab-case names tied to the content:
- `malinois-crate-training-1.avif`
- `malinois-socialization-puppy.avif`

---

## Step 4: Register in blog.ts

File: `src/lib/services/blog.ts`

### 4a. Add import (top of file)

```typescript
import newPostMd from '$lib/content/blog/[your-slug].md?raw';
```

### 4b. Add to blogPostsData array

```typescript
const blogPostsData = [
  { slug: 'first-time-owner-truth', content: firstTimeOwnerPostMd },
  { slug: 'is-malinois-right-for-you', content: isMalinoisRightPostMd },
  { slug: 'belgian-malinois-exercise-needs', content: exerciseNeedsPostMd },
  { slug: '[your-slug]', content: newPostMd }  // add here
];
```

- Slug must match filename exactly (no `.md`), kebab-case
- Posts are sorted newest-first by date automatically — order in array doesn't matter
- Run `npm run build` to validate before deploying

---

## Step 5: Git Deploy

```bash
cd ~/Development/belgianmalinoispup

git add src/lib/content/blog/[slug].md
git add src/lib/services/blog.ts
git add static/images/blog/YYYY-MM/[image].avif  # if new images downloaded

git commit -m "Add blog post: [Title]"
git push origin main
```

Vercel auto-deploys on push to `main`.

---

## Error Handling

| Issue | Fix |
|---|---|
| Build fails | Check `blog.ts` syntax — look for missing imports or trailing commas |
| Image 404 | Verify `image:` path in frontmatter matches actual file in `static/` |
| Post not showing | Confirm slug is registered in `blogPostsData` array in `blog.ts` |
| Git push fails | Pull latest, resolve conflicts, retry |
| AVIF conversion fails | Keep `.jpg` as fallback, flag for manual fix — do not delete original |

---

## Guardrails

- Never publish a topic already covered — check existing posts table above before writing
- Never reuse an image already referenced in another post's frontmatter
- Always source images specific to the blog content — reject generic dog stock imagery
- Reuse existing downloaded images before fetching new ones
- Run `npm run build` locally before committing
- If fewer than 3 suitable unique images can be sourced, flag for manual review before publishing
- If build fails after registry update, revert `blog.ts` changes and report the error

---

## Key Differences vs. FarmerMarket.us

| Area | FarmerMarket.us | BelgianMalinoisPup.com |
|---|---|---|
| Image format | `.jpg` downloaded, converted to `.avif` | Source as `.avif` directly; convert if needed |
| Image dedup registry | `src/lib/data/usedImages.ts` | Check post frontmatter via grep |
| Prerender config | `prerender-config.cjs` must be kept in sync | Not needed — `adapter-vercel` handles it |
| Research focus | Seasonal produce, farmers market trends | Breed ownership, training, health |
| Content cadence | Mon/Wed/Fri 8am CT (cron) | As scheduled or on-demand |
| Adapter | `adapter-static` | `adapter-vercel` |

---

*Skill authored by Conan. Modeled after farmermarket-blog. Maintained alongside the BelgianMalinoisPup.com project.*
