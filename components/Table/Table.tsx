'use client';

import { useState, useEffect, Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';

import TableHeadItem from './components/TableHeadItem';
import TableRow from './components/TableRow';
import Loader from '../Loader';

import {
  convertRowToDTO,
  generateTableBodyData,
  generateTableHeaders,
} from '@/utils/table';

import { tablesApi } from '@/lib/redux/api/tablesApi';
import { useDispatch } from '@/lib/redux';

import './styles.css';
import StatusPanel from './components/StatusPanel';
import { RequestResponseError } from '@/types/common.type';

const FetchError = dynamic(() => import('../FetchError'), { ssr: false });
const EmptyState = dynamic(() => import('../EmptyState'), { ssr: false });
const Pagination = dynamic(() => import('../Pagination'), { ssr: false });

const notifyError = () => toast.error('Something went wrong');

const Table = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [updatedItemId, setUpdatedItemId] = useState<string | null>(null);
  const [focusedRow, setFocusedRow] = useState<string | null>(null);

  const offset = searchParams.get('offset') ?? 0;
  const limit = searchParams.get('limit') ?? 10;
  const initialPage = Number(offset) / 10 + 1;

  const {
    data,
    refetch: refetchTables,
    isLoading: isTableLoading,
    isError: isTableError,
  } = tablesApi.useGetTablesQuery(Number(offset));

  const tables = data?.results ?? [];
  const tablesCount = data?.count ?? 0;

  const [firstTable] = tables;

  const thData = generateTableHeaders([firstTable]);
  const tableBodyData = generateTableBodyData(tables, thData);

  const [
    updateRow,
    {
      isLoading: isUpdateProcessing,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      error: updateError,
    },
  ] = tablesApi.useUpdateTableMutation();

  const handleRowChange = async (rowData: (string | Date)[]) => {
    const { id, ...dto } = convertRowToDTO(rowData, thData);
    setFocusedRow(null);
    setUpdatedItemId(id);

    await updateRow({ id, ...dto });
  };

  useEffect(() => {
    if (isUpdateError) {
      notifyError();
    }
  }, [isUpdateError]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (updatedItemId && isUpdateSuccess && isUpdateProcessing) {
      timeoutId = setTimeout(() => {
        setUpdatedItemId(null);
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isUpdateSuccess]);

  const handleCellFocus = (id: string) => {
    setFocusedRow(id);
  };
  const handleCellBlur = () => {
    setFocusedRow(null);
  };

  const handlePageChange = (page: number) => {
    const params = Array.from(searchParams.entries());
    const writableParams = new URLSearchParams(params);

    writableParams.set('offset', String((page - 1) * 10));
    const query = writableParams.toString();

    dispatch(tablesApi.util.invalidateTags(['Tables']));
    router.push(`${pathname}?${query}`);
  };

  if (isTableError) {
    return <FetchError onTryAgain={refetchTables} />;
  }

  if (isTableLoading) {
    return <Loader />;
  }

  if (tables.length === 0) {
    return <EmptyState />;
  }
  const [errorMessages = []] = Object.values(
    (updateError as RequestResponseError)?.data || {}
  );
  const [errorMessage] = errorMessages;

  return (
    <Suspense fallback={<Loader />}>
      <div className="table-wrapper">
        <StatusPanel
          isUpdating={isUpdateProcessing}
          isSuccess={isUpdateSuccess && !!updatedItemId}
          isInFocus={!!focusedRow}
          isError={isUpdateError}
          errorMessage={errorMessage}
        />

        <table>
          <thead>
            <tr>
              {thData.map((tHead) => {
                return (
                  <TableHeadItem key={tHead.id} item={tHead.displayName} />
                );
              })}
            </tr>
          </thead>

          <tbody>
            {tableBodyData.map((item) => {
              return (
                <TableRow
                  key={item.id}
                  id={item.id}
                  data={item.data}
                  disabled={updatedItemId}
                  focusedRow={focusedRow}
                  onRowChange={handleRowChange}
                  onCellFocus={handleCellFocus}
                  onCellBlur={handleCellBlur}
                />
              );
            })}
          </tbody>
        </table>

        <Pagination
          currentPage={initialPage}
          onPageChange={handlePageChange}
          totalCount={tablesCount}
          pageSize={Number(limit)}
        />
      </div>
    </Suspense>
  );
};

export default Table;
