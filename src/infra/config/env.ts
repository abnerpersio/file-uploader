import { config } from 'dotenv';
import { join, resolve } from 'path';

const projectFolder = resolve(__dirname, '..', '..', '..');

config({
  path:
    process.env.NODE_ENV === 'test'
      ? join(projectFolder, '.env.test')
      : join(projectFolder, '.env'),
});
