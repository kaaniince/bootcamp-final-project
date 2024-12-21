export const API_URL = "http://localhost:3000/api";
export const ENDPOINTS = {
  // Product endpoints
  PRODUCTS: {
    GET_ALL: `${API_URL}/product`,
    GET_BY_ID: (id) => `${API_URL}/product/${id}`,
  },
};
