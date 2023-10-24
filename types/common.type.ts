export type Uuid = {
  id: string;
};

export type Table = {
  id: string;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
};

export type TableListResponse<TData> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: TData;
};

export type AuthResponseSuccess = {
  message: string;
};

export type AuthResponseFailure = {
  data: {
    error: string;
  };
};

export type RequestResponseError = {
  data: {
    [key: string]: string[];
  };
};
