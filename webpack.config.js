import { resolve } from 'path';

export const entry = './index.js';
export const output = {
  path: resolve(__dirname, 'dist'), // Output directory
  filename: 'eventgeni.js', // Output filename
};
