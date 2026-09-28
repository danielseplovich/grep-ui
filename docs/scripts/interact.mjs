// Interaction checks: search, tabs, copy, theme toggle, mobile drawer, keyboard nav.
import { chromium } from 'playwright'
const base = process.env.BASE || 'http://localhost:5173'
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, permissions: ['clipboard-read', 'clipboard-write'] })
const page = await ctx.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
const results = []
const check = (name, ok, extra = '') => results.push(`${ok ? 'ok  ' : 'FAIL'} ${name}${extra ? ' — ' + extra : ''}`)

await page.goto(base + '/components/button', { waitUntil: 'networkidle' })

// 1. Search via ⌘K
await page.keyboard.press('Meta+k')
await page.waitForSelector('.doc-search-dialog', { timeout: 3000 })
check('⌘K opens search', true)
await page.keyboard.type('tog')
await page.waitForTimeout(100)
const first = await page.textContent('.doc-search-dialog [role=option][aria-selected=true]')
check('search ranks Toggle first', first?.trim() === 'Toggle', first)
await page.keyboard.press('ArrowDown')
await page.keyboard.press('ArrowUp')
await page.keyboard.press('Enter')
await page.waitForURL('**/components/toggle')
check('Enter navigates', page.url().endsWith('/components/toggle'))
check('dialog closed after navigation', (await page.$('.doc-search-dialog')) === null)

// 2. Escape closes
await page.click('.doc-header__search .grep-search')
await page.waitForSelector('.doc-search-dialog')
await page.keyboard.press('Escape')
await page.waitForTimeout(50)
check('Escape closes search', (await page.$('.doc-search-dialog')) === null)

// 3. Code tab + copy
const codeTab = page.locator('#preview .grep-tab', { hasText: 'Code' })
await codeTab.click()
check('Code tab shows code', (await page.locator('#preview .doc-example__code code.doc-code__body').count()) === 1)
const codeText = await page.locator('#preview .doc-example__code code.doc-code__body').textContent()
check('code collapses svg bodies', /<svg[^>]*>…<\/svg>/.test(codeText) || !codeText.includes('<svg'), codeText.slice(0, 80))
await page.click('#preview .doc-example__tools button[aria-label="Copy HTML"]')
await page.waitForTimeout(100)
const clip = await page.evaluate(() => navigator.clipboard.readText())
check('copy puts full html on clipboard', clip.includes('grep-toggle') && clip.includes('<span class="grep-toggle__track">'), clip.slice(0, 60))
check('copy button shows copied state', (await page.$('#preview .doc-example__tools button[aria-label="Copied"]')) !== null)

// 4. Preview theme toggle
await page.locator('#preview .grep-tab', { hasText: 'Preview' }).click()
await page.click('#preview button[aria-label="Preview in dark mode"]')
const stageTheme = await page.getAttribute('#preview .doc-example__stage', 'data-theme')
check('preview theme override', stageTheme === 'dark', stageTheme)
check('site theme unchanged', (await page.evaluate(() => document.documentElement.dataset.theme)) === 'light')

// 5. Site theme toggle persists
await page.click('header button[aria-label="Switch to dark mode"]')
check('site theme toggles', (await page.evaluate(() => document.documentElement.dataset.theme)) === 'dark')
await page.reload({ waitUntil: 'networkidle' })
check('theme persists across reload', (await page.evaluate(() => document.documentElement.dataset.theme)) === 'dark')
await page.click('header button[aria-label="Switch to light mode"]')

// 6. Prose copy button in Usage
await page.hover('#usage .doc-code')
await page.click('#usage .doc-code__copy')
await page.waitForTimeout(100)
const clip2 = await page.evaluate(() => navigator.clipboard.readText())
check('usage code copy', clip2.includes('grep-toggle'), clip2.slice(0, 40))

// 7. Internal links inside prose navigate client-side
await page.goto(base + '/contradictions', { waitUntil: 'networkidle' })
const link = page.locator('.doc-prose a[data-internal][href="/components/avatar"]').first()
await link.click()
await page.waitForURL('**/components/avatar')
check('prose link → component page', page.url().endsWith('/components/avatar'))

// 8. TOC active state + anchor
await page.click('.doc-toc a[href="#examples"]')
await page.waitForTimeout(1500)
await page.mouse.wheel(0, 1)
await page.waitForTimeout(200)
const active = await page.getAttribute('.doc-toc a[aria-current=true]', 'href')
check('toc tracks scroll', active === '#examples', active)

// 9. Keyboard: tab from skip link into header
await page.goto(base + '/', { waitUntil: 'networkidle' })
await page.keyboard.press('Tab')
const focused = await page.evaluate(() => document.activeElement?.className)
check('first tab hits skip link', /doc-skip/.test(focused || ''), focused)
await page.keyboard.press('Enter')
await page.waitForTimeout(100)
check('skip link moves focus to main', (await page.evaluate(() => document.activeElement?.id)) === 'doc-content')

// 10. Mobile drawer
await page.setViewportSize({ width: 390, height: 844 })
await page.goto(base + '/components/badge', { waitUntil: 'networkidle' })
await page.click('button[aria-label="Open navigation"]')
await page.waitForTimeout(250)
check('drawer opens', (await page.getAttribute('#doc-sidebar', 'data-open')) === 'true')
await page.click('#doc-sidebar a[href="/components/button"]')
await page.waitForURL('**/components/button')
await page.waitForTimeout(250)
check('drawer closes on navigate', (await page.getAttribute('#doc-sidebar', 'data-open')) === null)
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
check('no horizontal overflow on mobile', overflow <= 0, String(overflow))

// 11. 404 → home
await page.goto(base + '/nope/nothing', { waitUntil: 'networkidle' })
check('unknown route redirects home', new URL(page.url()).pathname === '/')

console.log(results.join('\n'))
if (errors.length) console.log('ERRORS:\n' + errors.join('\n'))
await browser.close()
