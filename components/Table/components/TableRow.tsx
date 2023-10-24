'use client';

import { isRowInitialData } from '@/utils/table';
import { useForm } from 'react-hook-form';
import { isValid } from 'date-fns';
import DatePicker from 'react-datepicker';
import cn from 'classnames';

import 'react-datepicker/dist/react-datepicker.css';

import { convertStringToDateString } from '@/utils/dates';

export type TableRowProps = {
  onRowChange: (rowData: (string | Date)[]) => void;
  onCellFocus?: (id: string) => void;
  onCellBlur?: () => void;
  data: (string | Date)[];
  id: string;
  disabled?: string | null;
  focusedRow: string | null;
};

const TableRow = ({
  id,
  data,
  disabled,
  focusedRow,
  onRowChange,
  onCellFocus,
  onCellBlur,
}: TableRowProps) => {
  const defaultValues = { [id]: data };

  const { register, handleSubmit, setValue, watch, getFieldState } = useForm({
    defaultValues,
  });

  const handleBlur = (values: Record<string, (string | Date)[]>) => {
    onCellBlur?.();

    const isInitial = isRowInitialData(defaultValues, values);

    if (isInitial) return;

    onRowChange(values[id]);
  };

  const handleDateChange = (date: Date | null, name: `${string}.${number}`) => {
    const dateString = convertStringToDateString(
      date ? date.toString() : new Date().toString()
    );
    setValue(name, dateString);
  };

  return (
    <tr
      key={id}
      className={cn({
        focused: focusedRow === id,
      })}
    >
      {data.map((item, index) => {
        const isReadonly = index === 0;
        const rawDate = watch(`${id}.${index}`);
        const date = new Date(rawDate);
        const isValidDate = isValid(date);
        const field = register(`${id}.${index}`, { required: true });
        const selectedDate = isValidDate ? date : new Date();
        const isDateCell = rawDate instanceof Date;
        const { onChange, ...restField } = field;

        return (
          <td
            key={item + id}
            className={cn({
              disabled: disabled === id,
            })}
          >
            {isDateCell && (
              <DatePicker
                {...restField}
                selected={selectedDate}
                dateFormat="yyyy-MM-dd"
                onChange={(newDate) =>
                  handleDateChange(newDate, `${id}.${index}`)
                }
                readOnly={isReadonly || disabled === id}
                disabled={disabled === id}
                onBlur={handleSubmit(handleBlur)}
                onFocus={() => onCellFocus?.(id)}
              />
            )}
            {!isDateCell && (
              <input
                {...field}
                readOnly={isReadonly || disabled === id}
                disabled={disabled === id}
                onBlur={handleSubmit(handleBlur)}
                onFocus={() => onCellFocus?.(id)}
              />
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
