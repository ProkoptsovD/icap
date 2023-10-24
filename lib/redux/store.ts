import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
} from 'react-redux';

import type { ThunkAction, Action } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';

import { reducer } from './rootReducer';
import { middleware } from './middleware';
import { createWrapper } from 'next-redux-wrapper';

export const makeStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(middleware);
    },
  });
export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

export const reduxStore = makeStore();

setupListeners(reduxStore.dispatch);

export const wrapper = createWrapper<ReduxStore>(makeStore, { debug: true });

export type ReduxStore = ReturnType<typeof makeStore>;
export type ReduxState = ReturnType<ReduxStore['getState']>;
export type ReduxDispatch = ReduxStore['dispatch'];
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;
