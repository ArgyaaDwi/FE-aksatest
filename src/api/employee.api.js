import api from "./axios";

export const getEmployees = (params) =>
  api.get("/employees", { params });

export const createEmployee = (data) =>
  api.post("/employees", data);

export const getEmployee = (id) => api.get(`/employees/${id}`);

export const updateEmployee = (id, data) =>
  api.post(`/employees/${id}`, data);

export const deleteEmployee = (id) =>
  api.delete(`/employees/${id}`);

export const getEmployeeCount = () =>
  api.get("/employees/total/count");

export const getLatestEmployees = () =>
  api.get("/employees/latest/5");