import { Table } from '@/types/common.type';
import { convertStringToDateString } from './dates';

export type TableHeaderItem = {
  displayName: string;
  name: string;
  id: string;
};

export const generateTableHeaders = (data: Table[]): TableHeaderItem[] => {
  const keys = Object.keys(data[0] ?? {});

  const headers = keys.reduce((acc, key) => {
    const displayName = key.replaceAll('_', ' ');

    return [...acc, { displayName, name: key, id: key }];
  }, [] as TableHeaderItem[]);

  return headers;
};

export type TableBodyItem = {
  id: string;
  data: (string | Date)[];
};

export const generateTableBodyData = (
  data: Table[],
  thData: TableHeaderItem[]
): TableBodyItem[] => {
  const tdData = data.map((item) => {
    const tdValues = thData.map((th) => {
      const value = item[th.name as keyof typeof item];

      if (th.name !== 'birthday_date') {
        return value;
      }

      const date = new Date(value);

      return date;
    });

    return tdValues;
  });

  const result = tdData.map((values, index) => {
    return {
      id: data[index].id,
      data: values,
    };
  });

  return result;
};

export const convertRowToDTO = (
  rowData: (string | Date)[],
  tHeaders: TableHeaderItem[]
): Table => {
  const dto = tHeaders.reduce((dtoObj, header, index) => {
    const key = header.name as keyof typeof dtoObj;
    let value = rowData[index];

    if (value instanceof Date) {
      value = convertStringToDateString(value);
    }

    dtoObj[key] = value;

    return dtoObj;
  }, {} as Table);

  return dto;
};

export const isRowInitialData = <TSource, TData>(
  source: TSource,
  data: TData
) => {
  try {
    const isEqual = JSON.stringify(data) === JSON.stringify(source);

    return isEqual;
  } catch {
    console.error('Data is malformed');
    return false;
  }
};
