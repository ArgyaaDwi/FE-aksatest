const AUTH_KEY = "auth_state";

export const storage = {
  get() {
    try {
      const data = localStorage.getItem(AUTH_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  set(value) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(value));
  },
  clear() {
    localStorage.removeItem(AUTH_KEY);
  },
};
