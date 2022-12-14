import { readdirSync, statSync } from 'fs';
import path from 'path';

export const isFolder = (name: string): boolean => {
  try {
    const stats = statSync(name);
    return stats.isDirectory();
  } catch (_error) {
    return false;
  }
};

export const isFile = (name: string): boolean => {
  try {
    const stats = statSync(name);
    return !stats.isDirectory();
  } catch (_error) {
    return false;
  }
};

export const getAllComponents = () => {
  return readdirSync(path.resolve('./components')).filter(folder => {
    return isFile(path.resolve(`./components/${folder}/package.json`));
  });
};
