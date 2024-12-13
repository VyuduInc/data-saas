import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
  autoConnect: false
});

export function connectToRealtimeUpdates(userId: string) {
  socket.auth = { userId };
  socket.connect();
  
  return socket;
}

export function disconnectFromRealtimeUpdates() {
  socket.disconnect();
}