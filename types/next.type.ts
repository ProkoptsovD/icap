import type { GetServerSidePropsContext, PreviewData } from 'next/types';
import type { ParsedUrlQuery } from 'querystring';

export type NextPageProps<
  TParams extends Record<string, string> = Record<string, string>
> = {
  params: TParams;
  searchParams?: { [key: string]: string | string[] | undefined };
};

export type NextPageContext = GetServerSidePropsContext<
  ParsedUrlQuery,
  PreviewData
>;
