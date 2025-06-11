
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'http://localhost:8081/api/';

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ["Categories"],
  endpoints: () => ({}),
  baseQuery: fetchBaseQuery({ baseUrl }),
})