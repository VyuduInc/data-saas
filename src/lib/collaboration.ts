import { Socket } from 'socket.io-client';
import { EventEmitter } from 'events';

export interface CollaborationUser {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'away' | 'offline';
  cursor?: {
    x: number;
    y: number;
    timestamp: number;
  };
  selection?: {
    start: number;
    end: number;
    timestamp: number;
  };
}

export interface CollaborationChange {
  type: 'insert' | 'delete' | 'update' | 'cursor' | 'selection';
  user: string;
  timestamp: number;
  data: any;
  position?: number;
  length?: number;
}

export interface CollaborationRoom {
  id: string;
  name: string;
  users: CollaborationUser[];
  changes: CollaborationChange[];
  createdAt: Date;
  updatedAt: Date;
}

export class CollaborationService extends EventEmitter {
  private socket: Socket;
  private rooms: Map<string, CollaborationRoom> = new Map();
  private currentUser: CollaborationUser;
  private changeBuffer: Map<string, CollaborationChange[]> = new Map();
  private bufferTimeout = 500; // ms

  constructor(socket: Socket, user: CollaborationUser) {
    super();
    this.socket = socket;
    this.currentUser = user;
    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    this.socket.on('user_joined', this.handleUserJoined.bind(this));
    this.socket.on('user_left', this.handleUserLeft.bind(this));
    this.socket.on('change', this.handleChange.bind(this));
    this.socket.on('cursor_move', this.handleCursorMove.bind(this));
    this.socket.on('selection_change', this.handleSelectionChange.bind(this));
    this.socket.on('sync_request', this.handleSyncRequest.bind(this));
    this.socket.on('sync_response', this.handleSyncResponse.bind(this));
  }

  async joinRoom(roomId: string) {
    this.socket.emit('join_room', {
      roomId,
      user: this.currentUser,
    });

    // Request sync from server
    this.socket.emit('sync_request', { roomId });
  }

  async leaveRoom(roomId: string) {
    this.socket.emit('leave_room', {
      roomId,
      user: this.currentUser,
    });
    this.rooms.delete(roomId);
  }

  async sendChange(roomId: string, change: Omit<CollaborationChange, 'user' | 'timestamp'>) {
    const fullChange: CollaborationChange = {
      ...change,
      user: this.currentUser.id,
      timestamp: Date.now(),
    };

    // Buffer changes
    let buffer = this.changeBuffer.get(roomId) || [];
    buffer.push(fullChange);
    this.changeBuffer.set(roomId, buffer);

    // Debounce sending changes
    if (buffer.length === 1) {
      setTimeout(() => {
        const changes = this.changeBuffer.get(roomId) || [];
        this.socket.emit('changes', {
          roomId,
          changes,
        });
        this.changeBuffer.delete(roomId);
      }, this.bufferTimeout);
    }
  }

  async updateCursor(roomId: string, position: { x: number; y: number }) {
    this.socket.emit('cursor_move', {
      roomId,
      user: this.currentUser.id,
      position: {
        ...position,
        timestamp: Date.now(),
      },
    });
  }

  async updateSelection(roomId: string, selection: { start: number; end: number }) {
    this.socket.emit('selection_change', {
      roomId,
      user: this.currentUser.id,
      selection: {
        ...selection,
        timestamp: Date.now(),
      },
    });
  }

  private handleUserJoined(data: { roomId: string; user: CollaborationUser }) {
    const room = this.rooms.get(data.roomId);
    if (room) {
      room.users.push(data.user);
      this.emit('user_joined', { roomId: data.roomId, user: data.user });
    }
  }

  private handleUserLeft(data: { roomId: string; userId: string }) {
    const room = this.rooms.get(data.roomId);
    if (room) {
      room.users = room.users.filter(u => u.id !== data.userId);
      this.emit('user_left', { roomId: data.roomId, userId: data.userId });
    }
  }

  private handleChange(data: { roomId: string; changes: CollaborationChange[] }) {
    const room = this.rooms.get(data.roomId);
    if (room) {
      room.changes.push(...data.changes);
      this.emit('changes', { roomId: data.roomId, changes: data.changes });
    }
  }

  private handleCursorMove(data: { roomId: string; userId: string; position: { x: number; y: number; timestamp: number } }) {
    const room = this.rooms.get(data.roomId);
    if (room) {
      const user = room.users.find(u => u.id === data.userId);
      if (user) {
        user.cursor = data.position;
        this.emit('cursor_move', { roomId: data.roomId, userId: data.userId, position: data.position });
      }
    }
  }

  private handleSelectionChange(data: { roomId: string; userId: string; selection: { start: number; end: number; timestamp: number } }) {
    const room = this.rooms.get(data.roomId);
    if (room) {
      const user = room.users.find(u => u.id === data.userId);
      if (user) {
        user.selection = data.selection;
        this.emit('selection_change', { roomId: data.roomId, userId: data.userId, selection: data.selection });
      }
    }
  }

  private handleSyncRequest(data: { roomId: string; userId: string }) {
    const room = this.rooms.get(data.roomId);
    if (room) {
      this.socket.emit('sync_response', {
        roomId: data.roomId,
        requestingUser: data.userId,
        room,
      });
    }
  }

  private handleSyncResponse(data: { roomId: string; room: CollaborationRoom }) {
    this.rooms.set(data.roomId, data.room);
    this.emit('room_synced', { roomId: data.roomId, room: data.room });
  }

  // Presence features
  async updateStatus(status: CollaborationUser['status']) {
    this.currentUser.status = status;
    this.socket.emit('status_change', {
      user: this.currentUser.id,
      status,
    });
  }

  // Conflict resolution
  private resolveConflict(change1: CollaborationChange, change2: CollaborationChange): CollaborationChange {
    // Implement Operational Transform (OT) algorithm
    if (change1.timestamp < change2.timestamp) {
      // Transform change2 against change1
      return this.transformChange(change2, change1);
    } else {
      // Transform change1 against change2
      return this.transformChange(change1, change2);
    }
  }

  private transformChange(laterChange: CollaborationChange, earlierChange: CollaborationChange): CollaborationChange {
    // Implementation of OT transformation rules
    switch (laterChange.type) {
      case 'insert':
        if (earlierChange.type === 'insert' && earlierChange.position! <= laterChange.position!) {
          return {
            ...laterChange,
            position: laterChange.position! + earlierChange.length!,
          };
        }
        break;
      case 'delete':
        if (earlierChange.type === 'insert' && earlierChange.position! < laterChange.position!) {
          return {
            ...laterChange,
            position: laterChange.position! + earlierChange.length!,
          };
        }
        break;
      // Add more transformation rules as needed
    }
    return laterChange;
  }
}
