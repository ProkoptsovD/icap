import { tablesApi } from './api/tablesApi';
import { authApi } from './api/authApi';

export const reducer = {
  [tablesApi.reducerPath]: tablesApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
};
