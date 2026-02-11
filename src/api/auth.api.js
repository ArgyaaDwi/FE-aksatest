import api from "./axios";

export const loginApi = async (payload) => {
  const response = await api.post("/login", payload);
  return response.data;
};

export const logoutApi = async (token) => {
  return api.post(
    "/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateProfileApi = (data) =>
  api.put("/profile", data);