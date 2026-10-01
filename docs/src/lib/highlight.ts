/* A small, dependency-free highlighter for the three languages the specs use:
   HTML, CSS and plain (ASCII anatomy diagrams). Output is monochrome by
   design — tone comes from weight and ink opacity, matching the system. */

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function span(cls: string, s: string): string {
  return `<span class="tok-${cls}">${esc(s)}</span>`
}

export function highlightHtml(src: string): string {
  let out = ''
  let i = 0
  const n = src.length
  while (i < n) {
    // comment
    if (src.startsWith('<!--', i)) {
      const end = src.indexOf('-->', i)
      const stop = end === -1 ? n : end + 3
      out += span('comment', src.slice(i, stop))
      i = stop
      continue
    }
    if (src[i] === '<') {
      const m = /^<(\/?)([A-Za-z][\w:-]*)/.exec(src.slice(i))
      if (m) {
        out += span('punct', '<' + m[1]) + span('tag', m[2])
        i += m[0].length
        // attributes until '>'
        while (i < n && src[i] !== '>') {
          const rest = src.slice(i)
          let a: RegExpExecArray | null
          if ((a = /^\s+/.exec(rest))) {
            out += esc(a[0])
            i += a[0].length
            continue
          }
          if ((a = /^\/(?=>)/.exec(rest))) {
            out += span('punct', '/')
            i += 1
            continue
          }
          if ((a = /^([^\s=/>]+)(\s*=\s*)("[^"]*"|'[^']*'|[^\s>]+)?/.exec(rest))) {
            out += span('attr', a[1])
            if (a[2]) out += span('punct', a[2])
            if (a[3]) out += span('val', a[3])
            i += a[0].length
            continue
          }
          if ((a = /^[^\s=/>]+/.exec(rest))) {
            out += span('attr', a[0])
            i += a[0].length
            continue
          }
          out += esc(src[i])
          i += 1
        }
        if (i < n) {
          out += span('punct', '>')
          i += 1
        }
        continue
      }
    }
    // text run
    const next = src.indexOf('<', i)
    const stop = next === -1 ? n : next
    out += esc(src.slice(i, stop))
    i = stop
  }
  return out
}

export function highlightCss(src: string): string {
  let out = ''
  let i = 0
  const n = src.length
  while (i < n) {
    const rest = src.slice(i)
    let m: RegExpExecArray | null
    if ((m = /^\/\*[\s\S]*?\*\//.exec(rest))) {
      out += span('comment', m[0])
      i += m[0].length
      continue
    }
    if ((m = /^\s+/.exec(rest))) {
      out += m[0]
      i += m[0].length
      continue
    }
    if ((m = /^--[\w-]+/.exec(rest))) {
      out += span('var', m[0])
      i += m[0].length
      continue
    }
    if ((m = /^("[^"]*"|'[^']*')/.exec(rest))) {
      out += span('val', m[0])
      i += m[0].length
      continue
    }
    if ((m = /^([a-z-]+)(\s*:)(?![a-z:-])/.exec(rest))) {
      out += span('attr', m[1]) + span('punct', m[2])
      i += m[0].length
      continue
    }
    if ((m = /^[{};:,]/.exec(rest))) {
      out += span('punct', m[0])
      i += 1
      continue
    }
    if ((m = /^[^\s{};:,"'/-]+|^[/-]/.exec(rest))) {
      out += esc(m[0])
      i += m[0].length
      continue
    }
    out += esc(src[i])
    i += 1
  }
  return out
}

/* TSX / JSX: keywords, strings, comments, and JSX tags via the HTML pass. */
const tsxKeywords = new Set(['import', 'export', 'from', 'default', 'function', 'return', 'const', 'let', 'var', 'type', 'interface', 'extends', 'as', 'async', 'await', 'if', 'else', 'true', 'false', 'null', 'undefined'])

export function highlightTsx(src: string): string {
  let out = ''
  let i = 0
  const n = src.length
  while (i < n) {
    const rest = src.slice(i)
    let m: RegExpExecArray | null
    if ((m = /^\/\/[^\n]*/.exec(rest)) || (m = /^\/\*[\s\S]*?\*\//.exec(rest))) {
      out += span('comment', m[0])
      i += m[0].length
      continue
    }
    if ((m = /^(["'`])(?:\\.|(?!\1)[^\\])*\1/.exec(rest))) {
      out += span('val', m[0])
      i += m[0].length
      continue
    }
    // a JSX element: hand the whole tag (through its closing >) to the HTML pass
    if ((m = /^<\/?[A-Za-z][\w.:-]*(?:\s[^<>]*)?\/?>/.exec(rest))) {
      out += highlightHtml(m[0])
      i += m[0].length
      continue
    }
    if ((m = /^[A-Za-z_$][\w$]*/.exec(rest))) {
      out += tsxKeywords.has(m[0]) ? span('tag', m[0]) : esc(m[0])
      i += m[0].length
      continue
    }
    if ((m = /^[{}()[\]=;,.:<>]/.exec(rest))) {
      out += span('punct', m[0])
      i += 1
      continue
    }
    out += esc(src[i])
    i += 1
  }
  return out
}

export function highlight(src: string, lang: string): string {
  if (lang === 'html' || lang === 'xml' || lang === 'svg') return highlightHtml(src)
  if (lang === 'css') return highlightCss(src)
  if (lang === 'tsx' || lang === 'jsx' || lang === 'ts' || lang === 'js') return highlightTsx(src)
  return esc(src)
}
