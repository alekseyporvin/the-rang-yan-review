import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const essays = await getCollection('essays', e => !e.data.draft);
  const poetry = await getCollection('poetry', e => !e.data.draft);
  const prose = await getCollection('prose', e => !e.data.draft);
  const interviews = await getCollection('interviews', e => !e.data.draft);
  const conversations = await getCollection('conversation-with', e => !e.data.draft);
  const criticism = await getCollection('criticism', e => !e.data.draft);

  const allArticles = [...essays, ...poetry, ...prose, ...interviews, ...conversations, ...criticism]
    .sort((a, b) => (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0))
    .slice(0, 40);

  return rss({
    title: 'The Rang Yan Review',
    description: 'A literary and philosophical journal of critical thought, culture, and human solidarity.',
    site: context.site ?? 'https://therangyanreview.org',
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
