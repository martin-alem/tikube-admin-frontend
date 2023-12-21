import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILogQueryPayload, ILogResult } from "../utils/types.ts";

const BACKEND_API_URL = import.meta.env.VITE_APP_BACKEND_API_URL;
export const logsApi = createApi({
  reducerPath: "logsApi",
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_API_URL }),
  endpoints: (builder) => ({
    getLogs: builder.query<ILogResult, ILogQueryPayload>({
      query: (payload) => ({
        url: `/admin/logs?limit=${payload.limit}&offset=${payload.offset}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetLogsQuery } = logsApi;
