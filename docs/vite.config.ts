import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

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

/**
 * grep.md — the whole system as one file an agent can read. Assembled at build
 * from the entry file, the full design reference and the hand-made rules, with
 * a header that says which version and which components it covers, and
 * served at /grep.md (dev) or emitted into dist (build) for the Export button.
 */
function grepMd(): Plugin {
  const root = fileURLToPath(new URL('..', import.meta.url))
  const read = (f: string) => (existsSync(resolve(root, f)) ? readFileSync(resolve(root, f), 'utf8') : '')
  const build = () => {
    const pkg = JSON.parse(read('package.json')) as { name: string; version: string }
    const reactDirs = readdirSync(resolve(root, 'react'), { withFileTypes: true }).filter((d) => d.isDirectory() && d.name !== 'lib' && d.name !== 'icons').map((d) => d.name)
    const cssDirs = readdirSync(resolve(root, 'Components'), { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith('_')).map((d) => d.name)
    const date = new Date().toISOString().slice(0, 10)
    const status = cssDirs.map((c) => `- ${c}: ${reactDirs.includes(c) ? 'React + CSS' : 'CSS only'}`).join('\n')
    const relink = (md: string) => md.replace(/\]\((?:\.\.\/)?(?:grepmd\/)?([A-Z_]+\.md)\)/g, '](#$1)')
    return [
      `# grep.md — Grep UI, the design system for Shade`,
      ``,
      `Generated ${date} from ${pkg.name}@${pkg.version} (https://grep-ui.vercel.app). Load this file before building any Shade interface. It is the entry file, the full design reference and the hand-made rules, in that order; the component list below says which components have a React version.`,
      ``,
      `## Components (${cssDirs.length})`,
      ``,
      status,
      ``,
      `---`,
      ``,
      relink(read('AGENTS.md')),
      ``,
      `---`,
      ``,
      relink(read('grepmd/DESIGN.md')),
      ``,
      `---`,
      ``,
      relink(read('grepmd/RULES.md')),
      ``,
      relink(read('grepmd/CONTRADICTIONS.md')),
    ].join('\n')
  }
  return {
    name: 'grep-md',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split('?')[0] !== '/grep.md') return next()
        res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
        res.end(build())
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'grep.md', source: build() })
    },
  }
}

// The docs site lives inside the Grep UI folder and reads the library
// (../Components, ../grepmd, ../Grep UI *) straight from disk at build time.
export default defineConfig({
  plugins: [leanSvg(), tokenDescriptions(), grepMd(), react()],
  server: {
    fs: { allow: ['..'] },
  },
  // ../react sits outside this package, so resolve React from here for it too
  resolve: { dedupe: ['react', 'react-dom'] },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 800,
  },
})
