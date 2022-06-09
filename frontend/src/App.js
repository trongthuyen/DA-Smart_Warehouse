import './App.css';
import React, { useEffect } from "react";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Signup from './components/SignUp';
import Detail from './components/Detail';
import Control from './components/Control';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useGetWarehousesQuery } from "./services/warehouseApi";
import { saveEquiment, saveLocation } from "./redux/slices/warehouseSlice";
import { useDispatch } from 'react-redux';
import { useGetEquipmentsQuery } from './services/equipmentApi';

export default function App() {
  const dispatch = useDispatch();
	const { data: warehouseListRes } = useGetWarehousesQuery();
  const { data: equipmentListRes, refetch: refetchGetEquipments } = useGetEquipmentsQuery({ warehouseId: warehouseListRes?.warehouseList[0]?.id || 0 });
  
	useEffect(() => {
    if(warehouseListRes) {
      dispatch(saveLocation(warehouseListRes.warehouseList));
      refetchGetEquipments();
		}
    if(equipmentListRes) {
      dispatch(saveEquiment(equipmentListRes.equipmentList));
    }
	}, [warehouseListRes, equipmentListRes]);
  
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/detail" element={<Detail/>} /> 
        <Route path="/control" element={<Control/>} /> 
      </Routes>
    </Router>
  );
}