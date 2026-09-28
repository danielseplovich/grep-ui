// Screenshot every example block on a page and stack them into one sheet.
// node scripts/examples-sheet.mjs <slug> [--dark]
import { chromium } from 'playwright'
import { execSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'

const slug = process.argv[2]
const dark = process.argv.includes('--dark')
const base = process.env.BASE || 'http://localhost:5173'
const dir = `/tmp/sheets/${slug}-${dark ? 'dark' : 'light'}`
mkdirSync(dir, { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: dark ? 'dark' : 'light' })
const page = await ctx.newPage()
await page.addInitScript((t) => localStorage.setItem('grep-docs-theme', t), dark ? 'dark' : 'light')
await page.goto(`${base}/components/${slug}`, { waitUntil: 'networkidle' })
await page.waitForTimeout(300)
const blocks = await page.$$('.doc-subsection:has(.doc-example), .doc-section#preview')
let i = 0
const files = []
for (const b of blocks) {
  await b.scrollIntoViewIfNeeded()
  const f = `${dir}/${String(i++).padStart(2, '0')}.png`
  await b.screenshot({ path: f })
  files.push(f)
}
await browser.close()
execSync(`python3 - <<'EOF'
from PIL import Image
files = ${JSON.stringify(files)}
ims = [Image.open(f) for f in files]
w = max(i.width for i in ims); h = sum(i.height for i in ims) + 16*len(ims)
sheet = Image.new('RGB', (w, h), (${dark ? '19,19,21' : '252,252,252'}))
y = 0
for im in ims:
    sheet.paste(im, (0, y)); y += im.height + 16
sheet.save('${dir}.png')
print('${dir}.png', sheet.size)
EOF`, { stdio: 'inherit' })
