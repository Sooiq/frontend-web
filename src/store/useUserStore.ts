import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserResDto } from '../types/user.types';

interface UserState {
  user: UserResDto | null;
  isAuthenticated: boolean;
  setUser: (user: UserResDto) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'user-storage', // name of item in localStorage
    }
  )
);

