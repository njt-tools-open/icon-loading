import path from 'path';
import fs, { readFileSync } from 'fs';

import * as rollup from 'rollup';
import { terser } from 'rollup-plugin-terser';
import rollupTypescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { sync as delSync } from 'del';
import { getAllComponents } from './tools';

/** 读取 package 信息 */
function getPkg(folder: string): Record<string, any> {
  return JSON.parse(
    fs.readFileSync(path.resolve(`${folder}/package.json`), {
      encoding: 'utf8',
    })
  );
}

/** 格式化 iife 输出全局命名 */
function formatIIFEName(name) {
  return name
    .replace(/.+\//, '')
    .replace(/^\w/, (s: string) => s.toUpperCase())
    .replace(/[^\w][a-zA-Z]/g, (s: string) => s[1].toUpperCase())
    .replace(/[^\w]/, '')
    .replace(/^\d+/, '');
}

/** 生成 bannber */
function getBanner(pkg) {
  return [
    '/*!',
    ` * ${pkg.name} - v${pkg.version}`,
    ` * ${pkg.name} is licensed under the MIT License.`,
    ' * http://www.opensource.org/licenses/mit-license',
    ' */',
  ].join('\n');
}

const getAllComponentName = (): string[] => {
  return getAllComponents().map(folder => {
    const content = readFileSync(
      path.resolve(`./components/${folder}/package.json`),
      { encoding: 'utf8' }
    );
    return JSON.parse(Array.isArray(content) ? content[0] : content)
      .name as string;
  });
};

/** 获取当前目录 inputOptions */
const getInputOptions = ({
  folder,
  format,
  isEntry,
}: {
  folder: string;
  format: 'esm' | 'iife';
  isEntry?: boolean;
}): rollup.RollupOptions => ({
  input: path.resolve(`${folder}/src/index.ts`),
  external:
    format === 'iife'
      ? []
      : ['lit', 'lit/decorators.js', ...(isEntry ? getAllComponentName() : [])],
  cache: false,
  plugins: [
    nodeResolve({
      preferBuiltins: true,
      browser: true,
    }),
    commonjs({
      include: ['node_modules/**', '../../node_modules/.pnpm/**'],
    }),
    babel({
      babelHelpers: 'bundled',
      include:
        format === 'iife'
          ? [
            '**.js',
            '**.mjs',
            'node_modules/**',
            '../../node_modules/.pnpm/**',
          ]
          : [],
      presets: [require.resolve('@babel/preset-env')],
    }),
    rollupTypescript({
      target: format === 'iife' ? 'es5' : 'es2015',
      tsconfig: path.resolve(`${folder}/tsconfig.json`),
    }),
    json({
      compact: true,
    }),
  ],
});

/** 获取 esm 输出配置 */
function getEsmOutput({ folder }: { folder: string }): rollup.OutputOptions {
  const pkg = getPkg(folder);
  const banner = getBanner(pkg);

  return {
    banner,
    file: path.resolve(`${folder}/lib/index.mjs`),
    format: 'esm',
    exports: 'auto',
    sourcemap: true,
  };
}

/** 获取 iife 输出配置i */
function getIifeOutput({ folder }: { folder: string }): rollup.OutputOptions {
  const pkg = getPkg(folder);
  const banner = getBanner(pkg);

  return {
    name: formatIIFEName(pkg.name),
    banner,
    file: path.resolve(`${folder}/lib/index.js`),
    format: 'iife',
    exports: 'auto',
    sourcemap: true,
    plugins: [terser()],
  };
}

export const build = async ({
  components,
}: {
  components: string[];
}) => {
  // 清除上次构建
  components.forEach(folder => {
    delSync(path.resolve(`${folder}/lib`));
  });

  // esm 构建
  const esmBundles = components.map(folder => {
    return rollup.rollup(
      getInputOptions({
        folder: folder,
        format: 'esm',
        isEntry: folder === 'packages/icon-loading',
      })
    );
  });

  await Promise.all(esmBundles).then(bundles => {
    bundles.forEach((bundle, index) => {
      bundle
        .write(
          getEsmOutput({
            folder: components[index],
          })
        )
        .then(() => {
          console.log(
            `[ICON COMPILER]: Build "${components[index]}" esm success.`
          );
        })
        .catch(error => {
          console.error(error);
        });
    });
  });

  // iife 构建
  const iifeBundles = components.map(folder => {
    return rollup.rollup(
      getInputOptions({
        folder: folder,
        format: 'iife',
      })
    );
  });

  await Promise.all(iifeBundles).then(bundles => {
    bundles.forEach((bundle, index) => {
      bundle
        .write(
          getIifeOutput({
            folder: components[index],
          })
        )
        .then(() => {
          console.log(
            `[ICON COMPILER]: Build "${components[index]}" iife success.`
          );
        })
        .catch(error => {
          console.error(error);
        });
    });
  });

  return null;
};

export const watch = ({
  components,
  iife,
}: {
  components: string[];
  iife?: boolean;
}) => {
  components.forEach(folder => {
    const pkg = getPkg(folder);
    const inputOptions = getInputOptions({
      folder,
      format: iife ? 'iife' : 'esm',
      isEntry: folder === 'packages/icon-loading',
    });
    const outputOptions = iife
      ? getIifeOutput({ folder })
      : getEsmOutput({
        folder,
      });
    const watcher = rollup.watch({
      ...inputOptions,
      output: [outputOptions],
    });
    watcher.on('event', event => {
      switch (event.code) {
        case 'START':
          console.log(`[ICON COMPILER]: Start building "${pkg.name}".`);
          break;
        case 'END':
          console.log(`[ICON COMPILER]: Build "${pkg.name}" success.`);
          break;
        case 'ERROR':
          console.log(`[ICON COMPILER]: Build "${pkg.name}" failed!`);
          console.log(JSON.stringify(event, null, 2));
          break;
        default:
      }
    });
  });
};
