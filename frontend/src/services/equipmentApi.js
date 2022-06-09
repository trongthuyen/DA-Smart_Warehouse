import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { useEffect } from "react";
import { baseQuery } from "./baseQuery";

export const equipmentApi = createApi({
	reducerPath: 'equipmentApi',
	baseQuery,
	endpoints: (builder) => ({
		getEquimentData: builder.query({
			query: (payload) => ({
				url: `/data/equipment/${payload.warehouseId}`,
			})
		}),
		getEquimentControl: builder.query({
			query: (payload) => ({
				url: `/equipment-control/${payload.warehouseId}`,
			})
		}),
		getEquipments: builder.query({
			query: (payload) => ({
				url: `/equipments/${payload.warehouseId}`,
			})
		}),
		createNewEquipment: builder.mutation({
			query: (payload) => ({
				url: `/equipments/add/${payload.warehouseId}`,
				method: 'POST',
				body: {
					name: payload.name,
					category: payload.category,
					locationId: payload.warehouseId
				}
			})
		}),
		updateEquipment: builder.mutation({
			query: (payload) => ({
				url: `/equipments/update/${payload.warehouseId}/${payload.equipmentId}`,
				method: 'PUT',
				body: {
					name: payload.name,
					locationId: payload.warehouseId
				}
			})
		}),
		deleteEquipment: builder.mutation({
			query: (payload) => ({
				url: `/equipments/delete/${payload.warehouseId}/${payload.equipmentId}`,
				method: 'DELETE',
			})
		}),
		setStatusEquipment: builder.mutation({
			query: (payload) => ({
				url: `/equipment/control/${payload.warehouseId}/${payload.equipmentId}/${payload.status}`,
				method: 'PUT',
			})
		})
	})
});

export const {
	useCreateNewEquipmentMutation,
	useGetEquimentControlQuery,
	useLazyGetEquimentControlQuery,
	useDeleteEquipmentMutation,
	useUpdateEquipmentMutation,
	useGetEquimentDataQuery,
	useGetEquipmentsQuery,
	useLazyGetEquipmentsQuery,
} = equipmentApi;
