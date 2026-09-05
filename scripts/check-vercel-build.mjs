import assert from 'node:assert/strict'
import { access, readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const output = new URL('../.vercel/output/', import.meta.url)
const readJson = async (path) =>
  JSON.parse(await readFile(new URL(path, output), 'utf8'))
const config = await readJson('config.json')
assert.equal(config.version, 3)
const filesystem = config.routes.findIndex(
  (route) => route.handle === 'filesystem',
)
const fallback = config.routes.findIndex(
  (route) => route.src === '/(.*)' && route.dest === '/__server',
)
assert.ok(
  filesystem >= 0 && fallback > filesystem,
  'Serve assets before SSR fallback',
)
const functionConfig = await readJson('functions/__server.func/.vc-config.json')
assert.equal(functionConfig.runtime, 'nodejs22.x')
assert.equal(functionConfig.handler, 'index.mjs')

// Exercise the actual deployed function, not the Vite development server.
const { default: handler } =
  await import('../.vercel/output/functions/__server.func/index.mjs')
const home = await handler.fetch(new Request('https://vuatho.test/'))
assert.equal(home.status, 200, 'Homepage must return 200')
const html = await home.text()
assert.match(html, /318888688/, 'SSR includes the configured company account')
assert.match(html, /id="dong-hanh"/, 'Contribution section is server-rendered')

const missing = await handler.fetch(
  new Request('https://vuatho.test/__missing_route__'),
)
assert.equal(missing.status, 404, 'Unknown URLs must keep their 404 status')
assert.match(await missing.text(), /href="\/"/, '404 page provides a way home')

for (const match of html.matchAll(
  /(?:src|href)="(\/(?:assets|images|logo)\/[^"?]+|\/favicon\.png)(?:\?[^" ]*)?"/g,
)) {
  await access(new URL(`static${match[1]}`, output))
}
// Include responsive image variants even if the SSR HTML uses another size.
for (const path of await readdir(new URL('../public/', import.meta.url), {
  recursive: true,
})) {
  await access(new URL(join('static', path), output))
}
console.log(
  'Vercel build verified: homepage 200, custom 404, static assets, Node 22 function.',
)
