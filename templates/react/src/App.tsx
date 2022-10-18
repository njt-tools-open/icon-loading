import classes from './App.module.css';

function App() {
  return (
    <div className={classes.App}>
      <div className={classes.container}>
        <div className={classes['loading-item']}>
          <div className={classes['loading-item-box']}>
            <loading-circle-1 />
          </div>
        </div>
        <div className={classes['loading-item']}>
          <div className={classes['loading-item-box']}>
            <loading-circle-2 />
          </div>
        </div>
        <div className={classes['loading-item']}>
          <div className={classes['loading-item-box']}>
            <loading-circle-3 />
          </div>
        </div>
        <div className={classes['loading-item']}>
          <div className={classes['loading-item-box']}>
            <loading-circle-4 />
          </div>
        </div>
        <div className={classes['loading-item']}>
          <div className={classes['loading-item-box']}>
            <loading-circle-5 />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
