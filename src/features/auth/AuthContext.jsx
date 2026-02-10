import { createContext, useContext, useEffect, useState } from "react";
import { AUTH_CREDENTIAL } from "../../lib/credentials";
import { storage } from "../../lib/storage";

const AuthContext = createContext(null);

const defaultAuthState = {
  isAuthenticated: false,
  user: null,
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(defaultAuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedAuth = storage.get();
    if (savedAuth?.isAuthenticated) {
      setAuth(savedAuth);
    }
    setLoading(false);
  }, []);

  const login = ({ username, password }) => {
    if (
      username === AUTH_CREDENTIAL.username &&
      password === AUTH_CREDENTIAL.password
    ) {
      const newAuth = {
        isAuthenticated: true,
        user: {
          name: "Admin Argya",
        },
      };

      setAuth(newAuth);
      storage.set(newAuth);
      return { success: true };
    }

    return { success: false, message: "Username atau password salah" };
  };

  const logout = () => {
    setAuth(defaultAuthState);
    storage.clear();
  };

  const updateProfile = ({ name }) => {
    setAuth((prev) => {
      const updated = {
        ...prev,
        user: {
          ...prev.user,
          name,
        },
      };
      storage.set(updated);
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        login,
        logout,
        updateProfile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth harus dipakai di dalam AuthProvider");
  }
  return ctx;
}
