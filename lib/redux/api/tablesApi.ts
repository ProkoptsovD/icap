import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { baseQuery } from './config';

import type { TableListResponse, Table, Uuid } from '@/types/common.type';

export const tablesApi = createApi({
  reducerPath: 'tableApi',
  tagTypes: ['Tables'],
  baseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getTables: builder.query<TableListResponse<Table[]>, number>({
      query: (offset = 0) => `table/?limit=10&offset=${offset}`,
      providesTags: (data) =>
        data
          ? [
              ...data.results.map(({ id }) => ({
                type: 'Tables' as const,
                id,
              })),
              'Tables',
            ]
          : ['Tables'],
    }),
    updateTable: builder.mutation<Table, Table>({
      query: ({ id, ...table }) => ({
        url: `table/${id}/`,
        method: 'PUT',
        body: table,
      }),
      // optimistic update
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        dispatch(
          tablesApi.util.updateQueryData('getTables', Number(id), (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          // undo optimistic update
          dispatch(tablesApi.util.invalidateTags(['Tables']));
        }
      },
    }),
  }),
});
