import { createContext, useState, useEffect } from "react";
import { ENDPOINTS } from "../constants";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${ENDPOINTS.AUTH.GET_CURRENT_USER}`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch(`${ENDPOINTS.AUTH.LOGIN}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setIsAuthenticated(true);
        toast.success("Welcome back!");
        return true;
      } else {
        toast.error(data.error || "Invalid credentials");
        return false;
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${ENDPOINTS.AUTH.REGISTER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful! Please login.");
        return true;
      } else {
        toast.error(data.error || "Registration failed");
        return false;
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${ENDPOINTS.AUTH.LOGOUT}`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        register,
        logout,
        loading,
        setUser,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
