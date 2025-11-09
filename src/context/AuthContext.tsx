// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import type { ReactNode } from "react";
import { userService } from "../services";
import type { UserResDto, RegisterUserReqDto } from "../types/user.types";

interface AuthContextType {
  user: UserResDto | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, _password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (payload: RegisterUserReqDto) => Promise<void>;
  setUser: (user: UserResDto | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserResDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state by fetching user from API (using cookie)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await userService.getMe();
        setUser(currentUser);
      } catch (error) {
        console.error("Not authenticated:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, _password: string) => {
    setIsLoading(true);
    try {
      const user = await userService.login(email, _password);
      console.log("Login successful, user:", user);
      setUser(user);
      // Cookie is set by the backend automatically
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (payload: RegisterUserReqDto) => {
    setIsLoading(true);
    try {
      const user = await userService.register(payload);
      console.log("Signup successful, user:", user);
      setUser(user);
      // Cookie is set by the backend automatically
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await userService.logout();
      // Backend clears the cookie
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
    }
  };

  const value: AuthContextType = useMemo(
    () => ({
      user,
      isAuthenticated: !!user && !!user.id,
      isLoading,
      login,
      logout,
      signup,
      setUser,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
