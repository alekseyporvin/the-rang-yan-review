import { getCollection } from 'astro:content';

export type VoiceLabel = 'contemporary' | 'earlier voice';

export async function getEarlierVoiceSlugs(): Promise<Set<string>> {
  const authors = await getCollection('authors');
  return new Set(
    authors.filter(author => author.data.earlierVoice).map(author => author.slug),
  );
}

export function voiceLabelFor(
  authorSlug: string | undefined,
  earlierVoiceSlugs: Set<string>,
): VoiceLabel {
  if (authorSlug && earlierVoiceSlugs.has(authorSlug)) {
    return 'earlier voice';
  }
  return 'contemporary';
}
