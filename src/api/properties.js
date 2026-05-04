import api from "./api"; // Your Axios instance

// --- PUBLIC ROUTES ---
export const fetchAllProperties = async (params = {}) => {
  const response = await api.get("/properties", { params });
  return response.data;
};

export const fetchPropertyById = async (id) => {
  const response = await api.get(`/properties/${id}`);
  return response.data;
};

export const fetchLatestProperties = async () => {
  const response = await api.get("/properties/latest");
  return response.data;
};

// --- OWNER ROUTES ---
export const fetchMyProperties = async () => {
  const response = await api.get("/properties/my-properties");
  return response.data;
};

export const createProperty = async (formData) => {
  const response = await api.post("/properties", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateProperty = async (id, formData) => {
  const response = await api.put(`/properties/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteProperty = async (id) => {
  const response = await api.delete(`/properties/${id}`);
  return response.data;
};
