import Graph from './Graph';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetSensorDataLogQuery } from '../services/sensorApi'
import { saveSensorDataLog } from '../redux/slices/warehouseSlice';
import { DAILY, HOURLY, MONTHLY, WEEKLY } from '../constants'
import { recieveRealtimeData } from '../services/listenEventSocket.io';
import { io, serverhost } from '../configs/configSocket.io';

const hourlyData = [
  '4:00',
  '5:00',
  '6:00',
  '7:00',
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
].map((i) => {
  const temper = -10 + Math.random() * 40;
  const humid = 10 + Math.random() * 70;
  return {
    name: i,
    temper,
    humid,
    amt: Math.floor(Math.random() * 10),
  };
});


export default function TabChart({ warehouseId }) {
  const [socket, setSocket] = useState(io(serverhost));
  const dispatch = useDispatch();
  const [toggleState, setToggleState] = useState(HOURLY);
  const { data: sensorDataLogRes, refetch: refetchGetSensorDataLog } = useGetSensorDataLogQuery({
    warehouseId: warehouseId || 0,
    type: toggleState === DAILY ? 'D' : 'H',
  });
  const { sensorDataLog } = useSelector(state => state.warehouse)

  useEffect(() => {
    if(sensorDataLogRes?.sensorDataLog) {
      dispatch(saveSensorDataLog(sensorDataLogRes.sensorDataLog))
    }
  }, [sensorDataLogRes])

  useEffect(() => {
    recieveRealtimeData(socket, [refetchGetSensorDataLog]);
  }, [])

  useEffect(() => {
    refetchGetSensorDataLog();
  }, [toggleState])

  return (
    <div className="containe">
      <div className="bloc-tabs">
        <button
          className={toggleState === HOURLY ? "tabs active-tabs" : "tabs"}
          onClick={() => setToggleState(HOURLY)}
        >
          Weekly
        </button>
        <button
          className={toggleState === DAILY ? "tabs active-tabs" : "tabs"}
          onClick={() => setToggleState(DAILY)}
        >
          Monthly
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={"content active-content"}
        >
          <Graph name={`${toggleState === HOURLY ? 'Hourly' : 'Daily'}`} graphData={sensorDataLog}/>
        </div>
      </div>
    </div>
  );
}
