import { updateProfileApi } from "../../api/auth.api";
import { createContext, useContext, useEffect, useState } from "react";
import { loginApi, logoutApi } from "../../api/auth.api";

const AuthContext = createContext(null);

const defaultAuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(defaultAuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setAuth({
        isAuthenticated: true,
        token,
        user: JSON.parse(user),
      });
    }

    setLoading(false);
  }, []);

  const login = async ({ username, password }) => {
    try {
      const res = await loginApi({ username, password });

      const { token, admin } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(admin));

      setAuth({
        isAuthenticated: true,
        token,
        user: admin,
      });

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login gagal",
      };
    }
  };

  const logout = async () => {
    try {
      if (auth.token) {
        await logoutApi(auth.token);
      }
    } catch (_) {}

    localStorage.clear();
    setAuth(defaultAuthState);
  };
  const updateProfile = async ({ name }) => {
    const res = await updateProfileApi({ name });

    const updatedUser = res.data.data.admin;

    const newAuth = {
      isAuthenticated: true,
      token: auth.token,
      user: updatedUser,
    };

    setAuth(newAuth);

    localStorage.setItem("user", JSON.stringify(updatedUser));

    return { success: true };
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
