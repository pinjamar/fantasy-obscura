/** Consistent alt text helpers — keeps book/category/author img alts uniform across the site. */

export function bookCoverAlt(title: string, author?: string): string {
  return author ? `Cover of ${title} by ${author}` : `Cover of ${title}`;
}

export function categoryAlt(name: string): string {
  return `${name} fantasy — category illustration`;
}

export function authorAlt(name: string): string {
  return `Photo of ${name}`;
}

/** Use for purely decorative images (bg textures, overlays). */
export function decorative(): string {
  return '';
}
