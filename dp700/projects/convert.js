const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const template = (title, content) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',system-ui,-apple-system,sans-serif;background:#0f1117;color:#e4e6eb;line-height:1.7;min-height:100vh}
.container{max-width:960px;margin:0 auto;padding:24px}
.back{display:inline-block;margin-bottom:16px;padding:8px 16px;background:#1a1d27;border:1px solid #2a2e3a;border-radius:8px;color:#8b8fa3;text-decoration:none;font-size:14px;transition:all .2s}
.back:hover{color:#e4e6eb;border-color:#6c5ce7}
h1{font-size:24px;margin:28px 0 12px 0;font-weight:700;background:linear-gradient(135deg,#6c5ce7,#00cec9);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
h2{font-size:19px;color:#00cec9;margin:24px 0 10px 0;padding-bottom:4px;border-bottom:1px solid #2a2e3a}
h3{font-size:16px;color:#e4e6eb;margin:18px 0 8px 0}
h4{font-size:14px;color:#8b8fa3;margin:12px 0 6px 0}
p{margin:8px 0}
ul,ol{padding-left:22px;margin:8px 0}
li{margin-bottom:4px}
code{background:#0a0c12;padding:2px 6px;border-radius:4px;font-size:13px;font-family:'Fira Code',Consolas,monospace;color:#00cec9}
pre{background:#0a0c12;padding:14px 16px;border-radius:8px;overflow-x:auto;margin:10px 0;border:1px solid #2a2e3a}
pre code{background:none;padding:0;border-radius:0;color:#e4e6eb;font-size:13px;line-height:1.5}
table{width:100%;border-collapse:collapse;margin:12px 0;font-size:13px}
th,td{padding:8px 12px;text-align:left;border:1px solid #2a2e3a}
th{background:#1a1d27;font-weight:600;color:#00cec9}
td{background:#0f1117}
blockquote{border-left:3px solid #6c5ce7;padding:8px 14px;margin:10px 0;background:#1a1d27;border-radius:0 8px 8px 0;color:#b0b4c0}
blockquote p{margin:2px 0}
hr{border:none;border-top:1px solid #2a2e3a;margin:20px 0}
a{color:#6c5ce7;text-decoration:none}
a:hover{text-decoration:underline}
input[type="checkbox"]{margin-right:6px;accent-color:#6c5ce7}
strong{color:#e4e6eb}
img{max-width:100%;border-radius:8px;margin:10px 0}
@media(max-width:640px){.container{padding:12px}h1{font-size:20px}h2{font-size:17px}.container{font-size:14px}table{font-size:12px}th,td{padding:6px 8px}}
</style>
</head>
<body>
<div class="container">
<a href="../../projects.html" class="back">← Back to Projects</a>
${content}
</div>
</body>
</html>`;

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => /^Specifications_\d+\.md$/.test(f));

files.forEach(file => {
  const md = fs.readFileSync(path.join(dir, file), 'utf8');
  const html = template('DP-700 ' + file.replace('.md', ''), marked.parse(md));
  const out = file.replace('.md', '.html');
  fs.writeFileSync(path.join(dir, out), html);
  console.log('Created ' + out);
});
