import { createSlice } from "@reduxjs/toolkit";
import moment from 'moment';

const initialState = {
  equipmentData: [],
  hourlyData: [],
  dailyData: [],
  monthlyData: [],
  location: [],
  equipment: [],
  data: [],
  detailData: [],
  sensorDataLog: [],
};

const warehousesSlice = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {
    saveEquipmentData(state, action) {
      state.equipmentData = action.payload;
    },
    saveHourlyData(state, action) {
      state.hourlyData = action.payload;
    },
    saveDailyData(state, action) {
      state.dailyData = action.payload;
    },
    saveMonthlyData(state, action) {
      state.monthlyData = action.payload;
    },
    saveLocation(state, action) {
      state.location = action.payload;
    },
    saveEquiment(state, action) {
      const equipmentList = action.payload.map(e => ({
        id: e.id,
        name: e.name,
        type: e.category,
        location: e.locationId,
        state: e.state,
        fInfo: e.temp,
        createdAt: moment(e.createdAt).format('hh:mm - DD/mm/yyyy'),
        updatedAt: moment(e.updatedAt).fromNow(),
      }))
      state.equipment = equipmentList;
    },
    saveData(state, action) {
      state.data = action.payload;
    },
    saveDetailData(state, action) {
      state.detailData = action.payload;
    },
    saveSensorDataLog(state, action) {
      state.sensorDataLog = action.payload;
    },
  },
});

const { actions, reducer } = warehousesSlice;

export const {
  saveDailyData,
  saveData,
  saveLocation,
  saveDetailData,
  saveEquipmentData,
  saveHourlyData,
  saveMonthlyData,
  saveSensorDataLog,
  saveEquiment
} = actions;

export default reducer;
