import { io } from 'socket.io-client';

const URL = import.meta.env.VITE_BASE_URL === 'production' ? undefined : 'http://localhost:3000';

export const socket = io(URL);