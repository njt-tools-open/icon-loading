import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { register as registerIconLoadingCircle1 } from '@njt-tools-open/icon-loading-circle-1';
import { register as registerIconLoadingCircle2 } from '@njt-tools-open/icon-loading-circle-2';
import { register as registerIconLoadingCircle3 } from '@njt-tools-open/icon-loading-circle-3';
import { register as registerIconLoadingCircle4 } from '@njt-tools-open/icon-loading-circle-4';
import { register as registerIconLoadingCircle5 } from '@njt-tools-open/icon-loading-circle-5';

registerIconLoadingCircle1();
registerIconLoadingCircle2();
registerIconLoadingCircle3();
registerIconLoadingCircle4();
registerIconLoadingCircle5();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
