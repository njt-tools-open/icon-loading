import { getAllComponents } from './tools';
import { build } from './compiler';

export const release = async () => {
  const components = getAllComponents().map(name => `components/${name}`);

  await build({ components });

  await build({ components: ['packages/icon-loading'] });
};
