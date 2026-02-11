import api from "./axios";

export const getDivisions = (params) =>
  api.get("/divisions", { params });

export const getDivisionsCount = () =>
  api.get("/divisions/total/count");
