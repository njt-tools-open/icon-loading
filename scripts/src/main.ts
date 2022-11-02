#!/usr/bin/env node

import { readFileSync } from 'fs';
import path from 'path';
import { Command } from 'commander';
import inquirer from 'inquirer';

import { build, watch } from './compiler';
import { create } from './create';
import { release } from './release';

import { getAllComponents } from './tools';

const pkg = JSON.parse(
  readFileSync(path.join(__dirname, '../package.json'), { encoding: 'utf8' })
);

const program = new Command();

program.version(pkg.verison, '-v', '--version');

/** 选择构建方式 */
const askBuildType = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: '选择目标:',
      choices: [
        {
          name: '入口文件',
          value: 'entry',
        },
        {
          name: '组件',
          value: 'components',
        },
      ],
    },
  ]);

  return answer.type;
};

/** 选择构建模式 */
const askBuildMode = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'mode',
      message: '选择模式:',
      choices: [
        {
          name: 'esm',
          value: 'esm',
        },
        {
          name: 'iife',
          value: 'iife',
        },
      ],
    },
  ]);

  return answer.mode;
};

/** 选择构建组件 */
const askBuildComponents = async () => {
  const choices = getAllComponents().map(folder => {
    return {
      name: folder,
      value: `components/${folder}`,
    };
  });

  const answer = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'components',
      message: '选择组件:',
      choices,
    },
  ]);

  return answer.components;
};

program
  .command('build')
  .description('构建组件')
  .action(async () => {
    const buildType = await askBuildType();
    
    if (buildType === 'entry') {
      build({ components: ['packages/icon-loading'] });
    } else {
      const components = await askBuildComponents();
      build({ components });
    }
  });

program
  .command('watch')
  .description('调试组件')
  .action(async () => {
    const buildType = await askBuildType();
    const buildMode = await askBuildMode();

    if (buildType === 'entry') {
      watch({
        components: ['packages/icon-loading'],
        iife: buildMode === 'iife',
      });
    } else {
      const components = await askBuildComponents();
      watch({ components, iife: buildMode === 'iife' });
    }
  });

program
  .command('create')
  .description('创建新组件')
  .action(async () => {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: '组件名称:',
      },
    ]);
    create(answer.name);
  });

program
  .command('release')
  .description('发布组件')
  .action(async () => {
    release();
  });

program.parse(process.argv);
