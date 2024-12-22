const basketService = require("../services/basket");

const basketController = {
  addToCart: async (req, res) => {
    const { userId, product, action } = req.body;

    try {
      let cart;
      if (action) {
        cart = await basketService.updateQuantity(userId, product.id, action);
      } else {
        cart = await basketService.addToCart(userId, product);
      }
      return res.status(200).json({ cart });
    } catch (error) {
      console.error("Error in addToCart:", error);
      return res.status(500).json({
        error: "Failed to update cart",
        details: error.message,
      });
    }
  },

  removeFromCart: async (req, res) => {
    const { userId, productId } = req.body;

    try {
      const cart = await basketService.removeFromCart(userId, productId);
      return res.status(200).json({ cart });
    } catch (error) {
      console.error("Error in removeFromCart:", error);
      return res.status(500).json({
        error: "Failed to remove item from cart",
        details: error.message,
      });
    }
  },

  clearCart: async (req, res) => {
    const { userId } = req.body;

    try {
      await basketService.clearCart(userId);
      return res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
      console.error("Error in clearCart:", error);
      return res.status(500).json({
        error: "Failed to clear cart",
        details: error.message,
      });
    }
  },

  viewCart: async (req, res) => {
    const { userId } = req.params;

    try {
      const cart = await basketService.getCart(userId);
      return res.status(200).json({ cart });
    } catch (error) {
      console.error("Error in viewCart:", error);
      return res.status(500).json({
        error: "Failed to fetch cart",
        details: error.message,
      });
    }
  },
};

module.exports = basketController;
