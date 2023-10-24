import classes from './styles.module.css';

export default function EmptyState() {
  return (
    <div className={classes.wrapper}>
      <strong className={classes.text}>No data available</strong>
    </div>
  );
}
