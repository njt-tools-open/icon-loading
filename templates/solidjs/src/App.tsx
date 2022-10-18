import { Component } from 'solid-js';

import classes from './App.module.css';

const App: Component = () => {
  return (
    <div class={classes.App}>
      <div class={classes.container}>
        <div class={classes['loading-item']}>
          <div class={classes['loading-item-box']}>
            <loading-circle-1 fills={['#efefef']} />
          </div>
        </div>
        <div class={classes['loading-item']}>
          <div class={classes['loading-item-box']}>
            <loading-circle-2 />
          </div>
        </div>
        <div class={classes['loading-item']}>
          <div class={classes['loading-item-box']}>
            <loading-circle-3 />
          </div>
        </div>
        <div class={classes['loading-item']}>
          <div class={classes['loading-item-box']}>
            <loading-circle-4 />
          </div>
        </div>
        <div class={classes['loading-item']}>
          <div class={classes['loading-item-box']}>
            <loading-circle-5 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
