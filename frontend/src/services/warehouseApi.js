import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const warehouseApi = createApi({
	reducerPath: 'warehouseApi',
	baseQuery,
	endpoints: (builder) => ({
		getWarehouses: builder.query({
			query: () => ({
				url: `/warehouses`,
			})
		}),
		createNewWarehouse: builder.mutation({
			query: (payload) => ({
				url: `/warehouses/add`,
				method: 'POST',
				body: payload,
			})
		}),
		updateWarehouse: builder.mutation({
			query: (payload) => ({
				url: `/warehouses/update/${payload.warehouseId}`,
				method: 'PUT',
				body: { 
					name: payload.name,
					address: payload.address
				},
			})
		}),
		deleteWarehouse: builder.mutation({
			query: (payload) => ({
				url: `/warehouses/delete/${payload.warehouseId}`,
				method: 'DELETE',
			})
		}),
	})
});


export const {
	useCreateNewWarehouseMutation,
	useUpdateWarehouseMutation,
	useDeleteWarehouseMutation,
	useGetWarehousesQuery,
} = warehouseApi;