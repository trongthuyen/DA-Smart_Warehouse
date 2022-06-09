import { saveEquiment } from "../redux/slices/warehouseSlice";

export const sendRequestControl = (socket, payload) => {
  // const socket = io(serverhost);
  // check to send a request to control an equipment
  if(payload !== undefined) {
    socket.emit('sendRequestControl', payload);
  }
}


export const recieveRealtimeData = (socket, func) => {
  socket.on('sendRealtimeData', res => {
    // console.log(res);
    func?.forEach(f => {f()});
  })
}