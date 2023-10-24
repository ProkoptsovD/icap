import classes from './styles.module.css';

type FetchErrorProps = {
  onTryAgain?: () => void;
};

export default function FetchError({ onTryAgain }: FetchErrorProps) {
  return (
    <div className={classes.wrapper}>
      <strong className={classes.text}>Failed to load data...</strong>

      <button type="button" className={classes.button} onClick={onTryAgain}>
        Try again
      </button>
    </div>
  );
}
