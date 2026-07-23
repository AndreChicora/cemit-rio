import { api } from "./api.js";

export const dashboardService = {
  get: async () => (await api.get("/dashboard")).data,
};

export const relatorioService = {
  falecidos: async (params) => (await api.get("/relatorios/falecidos", { params })).data,
  jazigos: async (params) => (await api.get("/relatorios/jazigos", { params })).data,
  sepultamentos: async (params) => (await api.get("/relatorios/sepultamentos", { params })).data,
};
