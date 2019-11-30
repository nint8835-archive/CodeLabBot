import { spawn } from 'child_process';
import path from 'path';

export default async function eslintCode(code: string): Promise<string | undefined> {
  let output = '';

  const process = spawn(
    'node',
    [path.join(
      __dirname,
      '..',
      'node_modules',
      'eslint',
      'bin',
      'eslint.js',
    ), '--stdin'],
  );

  process.on('error', (err) => console.error(err));

  process.stdout.on('data', (data) => {
    output += data;
  });

  process.stderr.on('data', (data) => {
    output += data;
  });

  process.stdin.write(code);
  process.stdin.end();

  return new Promise((resolve) => {
    const processKiller = setTimeout(() => {
      process.kill('SIGINT');
      output += '\nESLint took too long to run, killing.\n';
      resolve(output);
    }, 3000);
    process.on('close', (returnCode: number) => {
      clearTimeout(processKiller);
      if (returnCode === 0) {
        resolve();
      }
      const lines = output.split('\n');
      resolve(['', '```', ...lines.slice(2, lines.length - 3), '```'].join('\n'));
    });
  });
}
