// tools/build-node.js — même compilation que tools/build.js, pour les
// environnements sans macOS (sessions cloud, Linux). Lancé par tools/build.sh
// quand osascript n'existe pas. Même Babel (tools/babel.min.js), mêmes réglages.
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.resolve(__dirname, '..');
const ctx = { console };
ctx.window = ctx; ctx.self = ctx;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'tools/babel.min.js'), 'utf8'), ctx);
const Babel = ctx.Babel;
fs.mkdirSync(path.join(root, 'build'), { recursive: true });
let n = 0; const errs = [];
for (const f of fs.readdirSync(path.join(root, 'components')).filter(f => /\.jsx$/.test(f))) {
  try {
    const code = Babel.transform(fs.readFileSync(path.join(root, 'components', f), 'utf8'),
      { presets: ['env', 'react'], sourceType: 'script', compact: true, comments: false, filename: f }).code;
    fs.writeFileSync(path.join(root, 'build', f.replace(/\.jsx$/, '.js')),
      '/* généré depuis components/' + f + ' par tools/build.sh — ne pas éditer */\n' + code);
    n++;
  } catch (e) { errs.push(f + ' : ' + e.message); }
}
console.log(errs.length ? 'ERREURS\n' + errs.join('\n') : n + ' fichiers compilés dans build/');
if (errs.length) process.exit(1);
