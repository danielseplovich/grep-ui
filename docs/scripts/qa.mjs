// QA sweep: visit every route in both themes, capture console errors, and
// screenshot each page. node scripts/qa.mjs [--shots] [--dark]
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const base = process.env.BASE || 'http://localhost:5173'
const shots = process.argv.includes('--shots')
const themes = process.argv.includes('--dark') ? ['dark'] : process.argv.includes('--both') ? ['light', 'dark'] : ['light']
const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7)

const components = [
  'avatar', 'badge', 'banner', 'breadcrumbs', 'button', 'checkbox', 'context-menu', 'divider', 'file-tree-menu',
  'icon-button', 'input', 'item-block', 'keyboard-shortcut', 'label', 'modal', 'progress-bar', 'radio', 'search',
  'segmented-control', 'select', 'tabs', 'toast', 'toggle', 'tooltip',
]
let routes = ['/', '/installation', '/rules', '/contradictions', '/foundations/color', '/foundations/typography', '/foundations/spacing', '/foundations/effects', ...components.map((c) => `/components/${c}`)]
if (only) routes = routes.filter((r) => r.includes(only))

mkdirSync('/tmp/shots', { recursive: true })
const browser = await chromium.launch()
let failures = 0
for (const theme of themes) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: theme })
  const page = await ctx.newPage()
  const errors = []
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${m.type()}] ${m.text()}`)
  })
  page.on('pageerror', (e) => errors.push(`[pageerror] ${e.message}`))
  await page.addInitScript((t) => {
    try {
      localStorage.setItem('grep-docs-theme', t)
    } catch {}
  }, theme)
  for (const route of routes) {
    errors.length = 0
    await page.goto(base + route, { waitUntil: 'networkidle' })
    await page.waitForTimeout(250)
    // horizontal overflow check
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    const title = await page.title()
    const status = errors.length || overflow > 0 ? 'FAIL' : 'ok'
    if (status === 'FAIL') failures++
    console.log(`${status}  ${theme.padEnd(5)} ${route.padEnd(32)} ${title}${overflow > 0 ? `  overflow=${overflow}px` : ''}`)
    for (const e of errors) console.log('      ' + e.slice(0, 300))
    if (shots) await page.screenshot({ path: `/tmp/shots/${theme}${route.replace(/\//g, '_') || '_home'}.png`, fullPage: true })
  }
  await ctx.close()
}
await browser.close()
console.log(failures ? `${failures} failing` : 'all routes clean')
