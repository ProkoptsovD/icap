import classes from './styles.module.css';

export default function Loader() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.loader} />
    </div>
  );
}
