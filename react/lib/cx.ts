/** Join class names, skipping falsy entries. */
export function cx(...parts: Array<string | number | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
