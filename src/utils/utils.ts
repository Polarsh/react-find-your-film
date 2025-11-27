import slugify from "slugify";

export function parseSlug(slug?: string): {
  title: string | null;
  id: string | null;
} {
  if (!slug) return { title: null, id: null };

  const parts = slug.split("--");

  if (parts.length === 1) {
    return { title: null, id: parts[0] ?? null };
  }

  const id = parts.pop() ?? null;
  const title = parts.join("--") || null;

  return { title, id };
}

type ResourceType = "movie";
export function buildResourcePath(
  type: ResourceType,
  title: string,
  id: string
) {
  const slugifiedTitle = slugify(title, { lower: true, strict: true });

  return `/movies/${slugifiedTitle}--${id}`;
}
