export const API_URL = "http://localhost:3000/api";
export const ENDPOINTS = {
  // Product endpoints
  PRODUCTS: {
    GET_ALL: `${API_URL}/product`,
    GET_BY_ID: (id) => `${API_URL}/product/${id}`,
  },
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_URL}/auth/login`,
    REGISTER: `${API_URL}/auth/register`,
    LOGOUT: `${API_URL}/auth/logout`,
    UPDATE_PROFILE: `${API_URL}/auth/update-profile`,
    GET_CURRENT_USER: `${API_URL}/auth/me`,
  },
  ORDER: {
    CREATE_ORDER: `${API_URL}/order`,
    GET_ALL: `${API_URL}/order`,
    GET_BY_ID: (id) => `${API_URL}/order/${id}`,
  },
  BASKET: {
    ADD_TO_CART: `${API_URL}/basket`,
    REMOVE_FROM_CART: `${API_URL}/basket`,
    CLEAR_CART: `${API_URL}/basket/clear`,
    VIEW_CART: (userId) => `${API_URL}/basket/${userId}`,
  },
};
