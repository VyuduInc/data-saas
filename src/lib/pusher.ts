import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

if (!process.env.PUSHER_APP_ID) throw new Error('PUSHER_APP_ID is required');
if (!process.env.PUSHER_KEY) throw new Error('PUSHER_KEY is required');
if (!process.env.PUSHER_SECRET) throw new Error('PUSHER_SECRET is required');
if (!process.env.PUSHER_CLUSTER) throw new Error('PUSHER_CLUSTER is required');
if (!process.env.NEXT_PUBLIC_PUSHER_KEY) throw new Error('NEXT_PUBLIC_PUSHER_KEY is required');
if (!process.env.NEXT_PUBLIC_PUSHER_CLUSTER) throw new Error('NEXT_PUBLIC_PUSHER_CLUSTER is required');

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  enabledTransports: ['ws', 'wss'],
});

export const EVENTS = {
  MESSAGE_SENT: 'message:sent',
  MESSAGE_UPDATED: 'message:updated',
  MESSAGE_DELETED: 'message:deleted',
  CHAT_UPDATED: 'chat:updated',
  CHAT_DELETED: 'chat:deleted',
} as const;
