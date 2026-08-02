import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const essays = await getCollection('essays', e => !e.data.draft);
  const poetry = await getCollection('poetry', e => !e.data.draft);
  const prose = await getCollection('prose', e => !e.data.draft);
  const readingRoom = await getCollection('reading-room', e => !e.data.draft);

  const allArticles = [...essays, ...poetry, ...prose, ...readingRoom]
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .slice(0, 40);

  return rss({
    title: 'The Rangzen Review',
    description: 'A literary and philosophical journal of critical thought, culture, and human solidarity.',
    site: context.site ?? 'https://rangzenreview.org',
    items: allArticles.map(article => ({
      title: article.data.title,
      pubDate: article.data.date,
      description: article.data.excerpt,
      author: article.data.author,
      link: `/${article.collection}/${article.slug}/`,
      categories: article.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
