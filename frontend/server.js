const { spawn } = require('child_process');
const path = require('path');

const port = process.env.PORT || '3000';

const serverPath = path.join(__dirname, '.next', 'standalone', 'server.js');

const child = spawn('node', [serverPath], {
  cwd: __dirname,
  env: { ...process.env, PORT: port },
  stdio: 'inherit',
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});