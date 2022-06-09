import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery,
	endpoints: (builder) => ({
		getUserData: builder.query({
			query: (payload) => ({
				url: `/users/${payload.userId}`,
			}),
		}),
		createNewUser: builder.mutation({
			query: (payload) => ({
				url: `/users/register`,
				method: 'POST',
				body: payload,
			})
		}),
		updateUser: builder.mutation({
			query: (payload) => ({
				url: `/users/update/${payload.userId}`,
				method: 'PUT',
				body: {
					name: payload.name,
					email: payload.email,
					password: payload.password,
				}
			}),
		}),
		deleteUser: builder.mutation({
			query: (payload) => ({
				url: `/users/delete/${payload.userId}`,
				method: 'DELETE',
			})
		}),
		loginUser: builder.query({
			query: (payload) => ({
				url: `/users/login`,
				method: 'POST',
				body: payload,
			})
		}),
		logout: builder.query({
			query: (payload) => ({
				url: `/users/logout/${payload.userId}`,
			})
		})
	})
});


export const {
	useCreateNewUserMutation,
	useDeleteUserMutation,
	useGetUserDataQuery,
	useLazyGetUserDataQuery,
	useLazyLoginUserQuery,
	useLazyLogoutQuery,
	useLoginUserQuery,
	useLogoutQuery,
	useUpdateUserMutation
} = userApi;