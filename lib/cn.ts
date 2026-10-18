/**
 * Tiny className joiner. Filters out falsy values and joins with a space.
 * Kept dependency-free on purpose — this internal UI kit does not need
 * full clsx/tailwind-merge semantics.
 */
export type ClassValue = string | number | null | false | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
