import {
  existsSync,
  mkdir,
  readdirSync,
  readFileSync,
  statSync,
  writeFile,
} from 'fs';
import path from 'path';
import { isFolder } from 'tools';

const ejs = require('ejs');

const folderMk = (folder): Promise<null> => {
  return new Promise(resolve => {
    const isPathToExist = existsSync(folder);
    if (!isPathToExist || !statSync(folder).isDirectory()) {
      mkdir(folder, () => {
        resolve(null);
      });
    } else {
      resolve(null);
    }
  });
};

const copyFile = (
  pathFrom: string,
  pathTo: string,
  params: Record<string, any>,
  callback: () => void
) => {
  const str = readFileSync(pathFrom, { encoding: 'utf8' });
  const content = ejs.render(str, params);
  writeFile(pathTo, content, null, callback);
};

const folderCopy = (
  pathFrom: string,
  pathTo: string,
  params: Record<string, any>
): Promise<null> => {
  return new Promise(resolve => {
    if (existsSync(pathFrom) && statSync(pathFrom).isDirectory()) {
      folderMk(pathTo).then(() => {
        const dirLs = readdirSync(pathFrom).map(file => {
          return {
            name: file,
            isCopyed: false,
          };
        });
        dirLs.forEach(fileInfo => {
          const originPath = path.join(pathFrom, './' + fileInfo.name);
          const targetPath = path.join(pathTo, './' + fileInfo.name);

          if (statSync(originPath).isDirectory()) {
            folderCopy(originPath, targetPath, params).then(() => {
              fileInfo.isCopyed = true;
              if (!dirLs.find(__file => !__file.isCopyed)) {
                resolve(null);
              }
            });
          } else {
            fileInfo.isCopyed = true;
            copyFile(originPath, targetPath, params, () => {
              if (!dirLs.find(__file => !__file.isCopyed)) {
                resolve(null);
              }
            });
          }
        });
      });
    }
  });
};

export const create = (name: string) => {
  const originFolder = path.resolve('./scripts/template');
  const targetFolder = path.resolve(`./components/${name}`);

  if (isFolder(targetFolder)) {
    console.log(`[ICON COMPILER]: ${name} is exist.`);
    return;
  }
  folderCopy(originFolder, targetFolder, {
    name,
  });
};
