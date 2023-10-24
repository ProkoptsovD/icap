import { format as dateFnsFormat } from 'date-fns';

export const convertStringToDateString = (
  date: string | Date,
  config?: { format?: string }
) => {
  const { format = 'yyyy-MM-dd' } = config ?? {};
  const timestamp = Date.parse(date.toString());

  if (isNaN(timestamp) === false) {
    return dateFnsFormat(new Date(date), format);
  }

  return dateFnsFormat(new Date(), format);
};
