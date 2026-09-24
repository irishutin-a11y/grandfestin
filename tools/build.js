// tools/build.js — compile les composants JSX en JavaScript pour le navigateur.
// Lancé par tools/build.sh via le moteur JavaScript de macOS (osascript -l
// JavaScript) : aucun Node requis. Même transformation que Babel standalone
// dans le navigateur (presets env + react), donc même comportement, sans les
// 3 Mo de Babel ni la compilation à chaque visite.
ObjC.import('Foundation');
var fm = $.NSFileManager.defaultManager;
function read(p) { return $.NSString.stringWithContentsOfFileEncodingError(p, $.NSUTF8StringEncoding, null).js; }
function write(p, s) { $(s).writeToFileAtomicallyEncodingError(p, true, $.NSUTF8StringEncoding, null); }
function run(argv) {
  var root = argv[0];
  var window = this, self = this;
  eval(read(root + '/tools/babel.min.js'));
  var files = ObjC.deepUnwrap(fm.contentsOfDirectoryAtPathError(root + '/components', null));
  if (!fm.fileExistsAtPath(root + '/build')) fm.createDirectoryAtPathWithIntermediateDirectoriesAttributesError(root + '/build', true, $(), null);
  var n = 0, errs = [];
  files.filter(function (f) { return /\.jsx$/.test(f); }).forEach(function (f) {
    try {
      var code = Babel.transform(read(root + '/components/' + f), { presets: ['env', 'react'], sourceType: 'script', compact: true, comments: false, filename: f }).code;
      write(root + '/build/' + f.replace(/\.jsx$/, '.js'), '/* généré depuis components/' + f + ' par tools/build.sh — ne pas éditer */\n' + code);
      n++;
    } catch (e) { errs.push(f + ' : ' + e.message); }
  });
  return errs.length ? 'ERREURS\n' + errs.join('\n') : n + ' fichiers compilés dans build/';
}
