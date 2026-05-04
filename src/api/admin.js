import api from "./api";

// Fetch properties for the Admin Panel
export const fetchAdminProperties = async (
  status,
  page = 1,
  limit = 10,
  search = "",
) => {
  const response = await api.get(`/properties/admin/all`, {
    params: { status, page, limit, search },
  });
  return response.data;
};

// Approve or Reject a property
export const updateAdminPropertyStatus = async (id, status) => {
  const response = await api.put(`/properties/admin/${id}/status`, { status });
  return response.data;
};

// Fetch Users for the Admin Panel
export const fetchAdminUsers = async (page = 1, limit = 10, search = "") => {
  const response = await api.get(`/users/admin/all`, {
    params: { page, limit, search },
  });
  return response.data;
};

// Fetch Reports for the Admin Panel
export const fetchAdminReports = async (page = 1, limit = 10, search = "") => {
  const response = await api.get(`/reports/admin/all`, {
    params: { page, limit, search },
  });
  return response.data;
};
