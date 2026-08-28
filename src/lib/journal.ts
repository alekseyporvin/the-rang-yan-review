export const JOURNAL_NAME = 'The Rang Yan Review';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Italicize Rang Yan / Rang Yan Review / The Rang Yan Review (longest match first). */
export function italicizeJournalTerms(text: string): string {
  return text
    .replace(/(The Rang Yan Review|the Rang Yan Review)/g, '\u0001$1\u0002')
    .replace(/Rang Yan Review/g, '\u0001Rang Yan Review\u0002')
    .replace(/rang yan/g, '\u0001rang yan\u0002')
    .replace(/Rang Yan/g, '\u0001Rang Yan\u0002')
    .replace(/\u0001([^\u0002]+)\u0002/g, '<em>$1</em>');
}

/** Escape HTML, convert *italic* markers and [label](url) links, then italicize journal terms. */
export function withJournalItalics(text: string): string {
  const links: string[] = [];
  const withPlaceholders = text.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, (_, label, href) => {
    const token = `\u0003${links.length}\u0004`;
    links.push(`<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`);
    return token;
  });

  let html = italicizeJournalTerms(
    escapeHtml(withPlaceholders).replace(/\*([^*]+)\*/g, '<em>$1</em>'),
  );

  links.forEach((tag, i) => {
    html = html.replace(`\u0003${i}\u0004`, tag);
  });

  return html;
}

/** Escape HTML, then convert *italic* markers to <em>. */
export function withTitleItalics(text: string): string {
  return escapeHtml(text).replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

/** Plain text for cards/meta (strip *italic* markers). */
export function plainInline(text: string): string {
  return text.replace(/\*/g, '');
}

/** Plain title for browser tabs / meta (strip *italic* markers). */
export function plainTitle(text: string): string {
  return text.replace(/\*/g, '');
}
