// Screenshot helper for QA: node scripts/shot.mjs <path> <out.png> [--dark] [--width=1440] [--full] [--mobile]
import { chromium } from 'playwright'

const [, , route = '/', out = '/tmp/shot.png', ...flags] = process.argv
const dark = flags.includes('--dark')
const full = flags.includes('--full')
const mobile = flags.includes('--mobile')
const width = Number((flags.find((f) => f.startsWith('--width=')) || '--width=1440').split('=')[1])
const base = process.env.BASE || 'http://localhost:5173'

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: mobile ? 390 : width, height: mobile ? 844 : 900 },
  deviceScaleFactor: 2,
  colorScheme: dark ? 'dark' : 'light',
})
const page = await ctx.newPage()
const errors = []
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${m.type()}] ${m.text()}`)
})
page.on('pageerror', (e) => errors.push(`[pageerror] ${e.message}`))
await page.addInitScript((d) => {
  try {
    localStorage.setItem('grep-docs-theme', d ? 'dark' : 'light')
  } catch {}
}, dark)
await page.goto(base + route, { waitUntil: 'networkidle' })
await page.waitForTimeout(400)
await page.screenshot({ path: out, fullPage: full })
if (errors.length) console.log(errors.join('\n'))
else console.log('no console errors')
await browser.close()
