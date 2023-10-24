import React, { ReactElement } from 'react';

export type TableHeadItemProps<TItem extends string> = {
  item: TItem;
};

const TableHeadItem = <TItem extends string>({
  item,
}: TableHeadItemProps<TItem>) => {
  return <th title={item}>{item}</th>;
};

export default TableHeadItem;
