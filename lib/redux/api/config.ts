import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl =
  process.env.NEXT_API_URL ??
  'https://technical-task-api.icapgroupgmbh.com/api/';

export const baseQuery = fetchBaseQuery({ baseUrl });
