import { useDispatch, useSelector } from 'react-redux';
import Gas from './Gas';
import CurrentTemp from './CurrentTemp';
import Humidity from './Humidity';
import Light from './Light';
import NameCard from './NameCard';
import TabChart from './TabChart';
import AddComponent from './AddComponent';
import { useGetPresentDataQuery } from "../services/sensorApi";
import { useGetEquimentDataQuery } from "../services/equipmentApi";
import { useEffect, useState } from 'react';
import { saveEquipmentData } from '../redux/slices/warehouseSlice';
import { recieveRealtimeData } from '../services/listenEventSocket.io';
import { io, serverhost } from '../configs/configSocket.io';


export default function WareDetail({ warehouseId }) {
  const [socket, setSocket] = useState(io(serverhost));
  const dispatch = useDispatch();
  const { equipmentData } = useSelector(state => state.warehouse);
  const { data: presentSensorDataRes, refetch: refetchGetPresentSensorData } = useGetPresentDataQuery({warehouseId: warehouseId});
  const { data: equipmentDataListRes, refetch: refetchGetEquipmentData } = useGetEquimentDataQuery({warehouseId: warehouseId});
  const [sensorOffset, setSensorOffset] = useState({
    lightOffset: 0,
    humidityOffset: 0,
    tempOffset: 0,
    emit: false
  })
  const {
    lightOffset,
    humidityOffset,
    tempOffset,
    emit
  } = sensorOffset;

  useEffect(() => {
    if(presentSensorDataRes?.presentSensorData) {
      setSensorOffset(prev => ({
        ...prev,
        lightOffset: presentSensorDataRes.presentSensorData.intensityLight,
        humidityOffset: presentSensorDataRes.presentSensorData.humidity,
        tempOffset: presentSensorDataRes.presentSensorData.temperature,
        emit: presentSensorDataRes.presentSensorData.emitGas,
      }))
    }
    if(equipmentDataListRes?.equipmentData) {
      dispatch(saveEquipmentData(equipmentDataListRes.equipmentData));
    }
  }, [presentSensorDataRes, equipmentDataListRes])

  useEffect(() => {
    recieveRealtimeData(socket, [refetchGetEquipmentData, refetchGetPresentSensorData]);
  }, [])

  return (
    <div className="h-full flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
      <div className="w-full p-2 lg:w-1/4">
        <div className="rounded-lg bg-card h-80">
          <CurrentTemp offset={(tempOffset+15)*100/50}/>
        </div>
      </div>
      <div className="w-full p-2 lg:w-1/4">
        <div className="rounded-lg bg-card h-80">
          <Humidity offset = {humidityOffset}/>
        </div>
      </div>
      <div className="w-full p-2 lg:w-1/4">
        <div className="rounded-lg bg-card h-80">
          <Light offset = {Math.round((lightOffset*1.0).toFixed(2)/2000*100)}/>
        </div>
      </div>
      <div className="w-full p-2 lg:w-1/4">
        <div className="rounded-lg bg-card h-80">
          <Gas emit={emit}/>
        </div>
      </div>
      {equipmentData.map(
        ({
          id,
          name,
          type,
          position,
          ages,
          rise,
          mode,
          imgId,
        }) => (
          <NameCard
            key={id}
            id={id}
            name={name}
            position={position}
            age={ages}
            rise={rise}
            mode={type === 'Cooler' ? true : mode}
            imgId={imgId}
          />
        ),
      )}
      
      <div className="w-full p-2 lg:w-2/3">
        <div className="rounded-lg bg-card sm:h-100 h-100">
          <TabChart warehouseId={warehouseId}/>
        </div>
      </div>
      <div className="w-full p-2 lg:w-1/3">
        <div className="rounded-lg bg-card overflow-hidden">
          <AddComponent />
        </div>
      </div>
    </div>
  );
}
