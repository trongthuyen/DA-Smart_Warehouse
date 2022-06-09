import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import Image from './Image';
import EditE from './EditE';
import AddE from './AddE';
import { Switch } from 'antd';
import { ControlType } from '../constants';
import { recieveRealtimeData, sendRequestControl } from '../services/listenEventSocket.io';
import { FEED_CONDITION, FEED_DOOR, FEED_LED } from '../configs/configMqtt';
import { io, serverhost } from '../configs/configSocket.io';
import { saveEquiment } from '../redux/slices/warehouseSlice';
import { useGetEquipmentsQuery } from '../services/equipmentApi';


export default function DetailLocation({ warehouseId }) {
  const [socket, setSocket] = useState(io(serverhost))
	const dispatch = useDispatch();
  const { equipment, location } = useSelector(state => state.warehouse)
  const { data: equipmentListRes, refetch: refetchGetEquipments } = useGetEquipmentsQuery({ warehouseId: warehouseId || location[0]?.id || 0 });
  const [sendData, setSendData] = useState({
    equipmentId: 0,
    topic: '',
    value: '',
  });

  const handleDelete = (item) => {
    console.log(item);
  }

  const handleRequestControl = (equipment, controlType) => {
    const topic = equipment.type === 'Light'
      ? FEED_LED
      : equipment.type === 'Cooler'
      ? FEED_CONDITION
      : equipment.type === 'Door'
      ? FEED_DOOR : '';
    let value = '';
    switch (controlType) {
      case ControlType.ON:
        value = '1';
        break;
      case ControlType.OFF:
        value = '0';
        break;
      case ControlType.RISE:
        value = `${parseInt(equipment.fInfo) + 1}`;
        break;
        case ControlType.FALL:
        value = `${parseInt(equipment.fInfo) - 1}`;
        break;
      default: return;
    }
    setSendData({ equipmentId: equipment.id, topic, value });
  }

  const rows = equipment.map((item, index) => (
    <tr key={index}>
      <td className="sm:p-3 py-2 px-1 border-b border-gray-200">
        <div className="flex items-center">{index + 1}</div>
      </td>
      <td className="sm:p-3 py-2 px-1 border-b border-gray-200">
        <div className="flex items-center">
          {item.name}
        </div>
      </td>
      <td className="sm:p-3 py-2 px-1 border-b border-gray-200 md:table-cell hidden">
        <div className="flex items-center">
          {item.type === "Light" ? <Image path={`https://svgshare.com/i/hj5.svg`} className="w-4 h-4 mr-2.5"/> : item.type === "Cooler" ? <Image path={`https://svgshare.com/i/hoA.svg`} className="w-4 h-4 mr-2.5"/>: <Image path={`https://svgshare.com/i/hnH.svg`} className="w-4 h-4 mr-2.5"/>}
          {item.type}
        </div>
      </td>
      <td className="sm:p-3 py-2 px-1 border-b border-gray-200 text-green-600" style={{ width: 40 }}>
        {item.type !== 'Cooler' || true ?
        <Switch
          id={item.id}
          checked={item.state}
          checkedChildren="On"
          unCheckedChildren="Off"
          onChange={(checked) => handleRequestControl(item, checked ? ControlType.ON : ControlType.OFF)}
        /> :
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', fontSize: 30 }}>
          <CaretUpOutlined onClick={() => handleRequestControl(item, ControlType.RISE)} />
          <CaretDownOutlined onClick={() => handleRequestControl(item, ControlType.FALL)} />
        </div>
        }
      </td>
      <td className="sm:p-3 py-2 px-1 border-b border-gray-200 md:table-cell hidden">
        <div className="flex items-center">
          {`${(item.fInfo && item.type === 'Cooler') ? item.fInfo + ' °C' : ''}`}
        </div>
      </td>
      <td className="sm:p-3 py-2 px-1 border-b border-gray-200">
        <div className="flex items-center">
          <div className="sm:flex hidden flex-col">
            {item.createdAt}
            <div className="text-gray-400 text-xs">Changed at: {item.updatedAt}</div>
          </div>
          <EditE
            id={item.id}
            name={item.name}
            type={item.type}
            state={item.state}
            location={item.location}
            fInfo={item.fInfo}
          />
          <button className="w-4 h-4 inline-flex items-center justify-center text-gray-400 ml-10" onClick={() => handleDelete(item)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  ))


  useEffect(() => {
    if(sendData.value !== '') {
      console.log(sendData)

      sendRequestControl(socket, sendData);
      setSendData({ equipmentId: 0, topic: '', value: '' });
    }
  }, [sendData])
  
  useEffect(() => {
    recieveRealtimeData(socket, [refetchGetEquipments]);
  }, [])
  
  useEffect(() => {
    if(equipmentListRes?.equipmentList) {
      dispatch(saveEquiment(equipmentListRes?.equipmentList))
    }
  }, [equipmentListRes?.equipmentList])

  return (
    <div className="w-full p-2">
        <div className="rounded-lg bg-card p-5">
        <table className="w-full text-left">
          <thead>
            <tr className="text-white">
              <th className="font-normal px-3 border-b border-gray-200">STT</th>
              <th className="font-normal px-3 border-b border-gray-200">Name</th>
              <th className="font-normal px-3 border-b border-gray-200 hidden md:table-cell">Type</th>
              <th className="font-normal px-3 border-b border-gray-200">State</th>
              <th className="font-normal px-3 border-b border-gray-200 hidden md:table-cell">Further Info</th>
              <tr className="flex border-b border-gray-200">
                <th className="grow font-normal px-3 pt-3 pb-3">Created At</th>
                <th className="grow-0 mb-2"><AddE/></th>
              </tr>
            </tr>
          </thead>
          <tbody className="text-white">
            {rows}
          </tbody>
        </table>
        </div>
      </div>
  );
};