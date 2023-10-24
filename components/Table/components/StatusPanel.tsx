import cn from 'classnames';

type StatusPanelProps = {
  isUpdating: boolean;
  isSuccess: boolean;
  isInFocus: boolean;
  isError: boolean;
  errorMessage?: string;
};

export default function StatusPanel({
  isInFocus,
  isSuccess,
  isUpdating,
  isError,
  errorMessage,
}: StatusPanelProps) {
  return (
    <div className="saving-status">
      <div className={cn('container')}>
        {isUpdating && <span className="is-updating">Is saving...</span>}
        {isSuccess && <span className="is-saved">Saved!</span>}
        {isInFocus && <span className="is-edit">Cell is in edit mode.</span>}
        {isError && (
          <span className="is-error">
            {errorMessage || 'Error! Save failed'}
          </span>
        )}
      </div>
    </div>
  );
}
