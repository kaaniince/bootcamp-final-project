import { createContext } from "react";
import { useCart } from "../hooks/useCart";
import { ENDPOINTS } from "../constants";
import { toast } from "react-toastify";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    clearCart,
    increaseAmount,
    decreaseAmount,
    itemAmount,
    total,
  } = useCart();

  const syncCartWithBackend = async (userId) => {
    try {
      const response = await fetch(ENDPOINTS.BASKET.VIEW_CART(userId), {
        credentials: "include",
      });
      const data = await response.json();
      if (data.cart) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error("Error syncing cart:", error);
    }
  };

  const removeFromCartWithBackend = async (productId, userId) => {
    try {
      const response = await fetch(ENDPOINTS.BASKET.REMOVE_FROM_CART, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId, productId }),
      });

      if (response.ok) {
        removeFromCart(productId);
        toast.success("Item removed from cart");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  const clearCartWithBackend = async (userId) => {
    try {
      const response = await fetch(ENDPOINTS.BASKET.CLEAR_CART, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        clearCart();
        toast.success("Cart cleared successfully");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  const updateQuantityWithBackend = async (userId, productId, action) => {
    try {
      const response = await fetch(ENDPOINTS.BASKET.ADD_TO_CART, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId,
          product: { id: productId },
          action,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (action === "increase") {
          increaseAmount(productId);
        } else {
          decreaseAmount(productId);
        }
        return data;
      } else {
        throw new Error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
      return null;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart: removeFromCartWithBackend,
        clearCart: clearCartWithBackend,
        increaseAmount: (productId, userId) =>
          updateQuantityWithBackend(userId, productId, "increase"),
        decreaseAmount: (productId, userId) =>
          updateQuantityWithBackend(userId, productId, "decrease"),
        itemAmount,
        total,
        syncCartWithBackend,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
