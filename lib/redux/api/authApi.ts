import type { AuthResponseSuccess } from '@/types/common.type';
import { AuthCredentialsDTO } from '@/types/dto';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './config';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponseSuccess, AuthCredentialsDTO>({
      query: (credentials) => ({
        url: '/login/',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});
