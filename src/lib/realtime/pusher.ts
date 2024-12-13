import PusherClient from 'pusher-js';
import PusherServer from 'pusher';

export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
});

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export interface RealtimeUpdate {
  type: 'analysis_started' | 'analysis_progress' | 'analysis_complete' | 'analysis_error';
  payload: any;
  timestamp: string;
  userId: string;
}

export async function broadcastUpdate(channelName: string, update: RealtimeUpdate) {
  try {
    await pusherServer.trigger(channelName, 'update', update);
  } catch (error) {
    console.error('Failed to broadcast update:', error);
  }
}
