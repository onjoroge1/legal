const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
function walk(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]); }
test('server logs only static labels, never payloads, error objects or document text', () => {
  for (const file of [...walk('app/api'), ...walk('lib')].filter(file => file.endsWith('.ts'))) {
    const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
    function visit(node) {
      if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && node.expression.expression.getText(source) === 'console') {
        assert.equal(node.arguments.length, 1, `${file}: log arguments must contain only a static label`);
        assert.ok(ts.isStringLiteral(node.arguments[0]), `${file}: dynamic log content`);
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
});
