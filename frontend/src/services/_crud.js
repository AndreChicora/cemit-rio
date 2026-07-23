import { api } from "./api.js";

function crud(base) {
  return {
    list: async (params) => (await api.get(base, { params })).data,
    getById: async (id) => (await api.get(`${base}/${id}`)).data,
    create: async (payload) => (await api.post(base, payload)).data,
    update: async (id, payload) => (await api.put(`${base}/${id}`, payload)).data,
    remove: async (id) => (await api.delete(`${base}/${id}`)).data,
  };
}

export default crud;
