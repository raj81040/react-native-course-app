import { create } from 'zustand';
import { getProfile, loginUser } from '../services/auth';
import {
  deleteToken,
  getToken,
  setToken,
} from '../utils/secureStorage';

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  login: (username: string, password: string) => Promise<void>;
  fetchProfile: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,

  login: async (username, password) => {
    const data = await loginUser(username, password);

    const authToken = data.token || data.accessToken;

    await setToken(authToken);

    set({
      token: authToken,
      user: {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        image: data.image,
      },
    });
  },

  fetchProfile: async () => {
    const token = get().token || (await getToken());

    if (!token) return;

    const profile = await getProfile(token);

    set({
      user: profile,
    });
  },

  logout: async () => {
    await deleteToken();

    set({
      token: null,
      user: null,
    });
  },
}));