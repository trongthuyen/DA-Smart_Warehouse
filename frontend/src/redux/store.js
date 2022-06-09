import { configureStore, combineReducers } from "@reduxjs/toolkit";
import warehouse from './slices/warehouseSlice';
import * as api from '../services';

export const rootReducer = combineReducers({
    // ...
    warehouse,
    [api.equipmentApi.reducerPath]: api.equipmentApi.reducer,
    [api.userApi.reducerPath]: api.userApi.reducer,
    [api.sensorApi.reducerPath]: api.sensorApi.reducer,
    [api.warehouseApi.reducerPath]: api.warehouseApi.reducer,
});

export function makeStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
            api.equipmentApi.middleware,
            api.userApi.middleware,
            api.sensorApi.middleware,
            api.warehouseApi.middleware
        ]),
    });
};

export const store = makeStore();
