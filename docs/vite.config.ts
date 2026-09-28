import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'

/**
 * The exported SVGs carry a C2PA <metadata> block of several KB each. It has no
 * effect on rendering, so strip it when an SVG is imported as raw text — the
 * files on disk are left untouched.
 */
function leanSvg(): Plugin {
  return {
    name: 'grep-lean-svg',
    enforce: 'pre',
    load(id) {
      if (!/\.svg\?raw$/.test(id)) return null
      const file = id.replace(/\?raw$/, '')
      const src = readFileSync(file, 'utf8')
        .replace(/<metadata>[\s\S]*?<\/metadata>/g, '')
        .replace(/\sxmlns:c2pa="[^"]*"/g, '')
      return `export default ${JSON.stringify(src)}`
    },
  }
}

/**
 * The Figma token exports are ~270 KB of values the site already has from
 * tokens.css. Only the $description strings are needed, so a `?descriptions`
 * import of a .tokens.json file resolves to a flat { '--token-name': text } map.
 */
function tokenDescriptions(): Plugin {
  return {
    name: 'grep-token-descriptions',
    enforce: 'pre',
    // route the import to a virtual id so Vite's own JSON plugin leaves it alone
    async resolveId(source, importer) {
      if (!/\.tokens\.json\?descriptions$/.test(source)) return null
      const r = await this.resolve(source.replace(/\?descriptions$/, ''), importer, { skipSelf: true })
      return r ? `\0grep-desc:${r.id}.desc` : null
    },
    load(id) {
      if (!id.startsWith('\0grep-desc:')) return null
      const file = id.slice('\0grep-desc:'.length).replace(/\.desc$/, '')
      const json = JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>
      const out: Record<string, string> = {}
      const walk = (o: unknown, path: string[]) => {
        if (!o || typeof o !== 'object') return
        const t = o as Record<string, unknown>
        if ('$type' in t) {
          if (typeof t.$description === 'string' && t.$description) out['--' + path.join('-')] = t.$description
          return
        }
        for (const [k, v] of Object.entries(t)) walk(v, [...path, k])
      }
      // Scale and Text files nest under a group name that is not part of the CSS name
      if (/Grep UI (Scale|Text)\//.test(file)) for (const v of Object.values(json)) walk(v, [])
      else walk(json, [])
      return `export default ${JSON.stringify(out)}`
    },
  }
}

// The docs site lives inside the Grep UI folder and reads the library
// (../Components, ../grepmd, ../Grep UI *) straight from disk at build time.
export default defineConfig({
  plugins: [leanSvg(), tokenDescriptions(), react()],
  server: {
    fs: { allow: ['..'] },
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 800,
  },
})
