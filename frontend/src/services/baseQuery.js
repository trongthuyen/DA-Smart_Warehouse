import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/warehouses/',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState()).auth?.token || '';

        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    },
})