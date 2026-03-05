import axios from 'axios';
import { Platform } from 'react-native';
/**
 * Base URL selection:
 * - Web: read from EXPO_PUBLIC_API_BASE_URL to avoid CORS; fall back to '/api' (requires a same-origin proxy).
 * - Android emulator: 10.0.2.2 targets host loopback.
 * - iOS/native dev: localhost:4000.
 */
const baseURL =
  Platform.OS === 'web'
    ? ((globalThis as any).process?.env?.EXPO_PUBLIC_API_BASE_URL as string | undefined) || '/api'
    : Platform.OS === 'android'
    ? 'http://10.0.2.2:4000/api'
    : 'http://localhost:4000/api';

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
