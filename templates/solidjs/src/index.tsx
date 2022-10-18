/* @refresh reload */
import { render } from 'solid-js/web';
import { register as registerIconLoadingCircle1 } from '@njt-tools-open/icon-loading-circle-1';
import { register as registerIconLoadingCircle2 } from '@njt-tools-open/icon-loading-circle-2';
import { register as registerIconLoadingCircle3 } from '@njt-tools-open/icon-loading-circle-3';
import { register as registerIconLoadingCircle4 } from '@njt-tools-open/icon-loading-circle-4';
import { register as registerIconLoadingCircle5 } from '@njt-tools-open/icon-loading-circle-5';

import './index.css';
import App from './App';

registerIconLoadingCircle1();
registerIconLoadingCircle2();
registerIconLoadingCircle3();
registerIconLoadingCircle4();
registerIconLoadingCircle5();

render(() => <App />, document.getElementById('root') as HTMLElement);
