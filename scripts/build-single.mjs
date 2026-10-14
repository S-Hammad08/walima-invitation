// Bundles the app into one self-contained HTML page (React loaded from cdnjs).
// Usage: node scripts/build-single.mjs [output.html]
import { build } from 'esbuild';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.resolve(process.argv[2] || path.join(root, 'dist-single', 'index.html'));
const tmp = path.join(root, 'dist-single', '.tmp');
await mkdir(tmp, { recursive: true });

await build({
  entryPoints: [path.join(root, 'src/main.jsx')],
  bundle: true,
  minify: true,
  format: 'iife',
  jsx: 'transform',
  outdir: tmp,
  alias: {
    react: path.join(root, 'scripts/shims/react.js'),
    'react-dom/client': path.join(root, 'scripts/shims/react-dom-client.js'),
  },
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'error',
});

const js = await readFile(path.join(tmp, 'main.js'), 'utf8');
const css = await readFile(path.join(tmp, 'main.css'), 'utf8');

const html = `<title>Walima Ceremony</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Great+Vibes&display=swap" rel="stylesheet">
<style>${css}</style>
<div id="root"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script>${js.replace(/<\/script/gi, '<\\/script')}</script>
`;

await mkdir(path.dirname(out), { recursive: true });
await writeFile(out, html);
console.log('wrote', out, (html.length / 1024).toFixed(1) + ' KB');
