const orderService = require("../services/order");

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { userId, products } = req.body;

      // Validation
      if (!userId) {
        return res.status(400).json({
          error: "userId is required",
          receivedData: req.body, // Debug için
        });
      }

      if (!products || !Array.isArray(products) || products.length === 0) {
        return res
          .status(400)
          .json({ error: "products array is required and cannot be empty" });
      }

      // Validate each product
      for (const product of products) {
        if (!product.id || !product.price || !product.amount) {
          return res.status(400).json({
            error: "Each product must have id, price, and amount",
          });
        }
      }

      const response = await orderService.createOrder({ userId, products });

      if (response) {
        res.status(201).json({ response });
      } else {
        res.status(500).json({ error: "Order creation failed" });
      }
    } catch (error) {
      console.error("Order creation error:", error);
      res.status(500).json({
        error: "An error occurred during order creation",
        details: error.message,
      });
    }
  },
  getOrder: async (req, res) => {
    try {
      const response = await orderService.getOrder(req.params);
      if (response) {
        res.status(200).json({ response });
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({
        error: "An error occurred during fetching the order",
        details: error.message,
      });
    }
  },
  getOrders: async (req, res) => {
    try {
      const response = await orderService.getOrders();
      if (response) {
        res.status(200).json({ response });
      } else {
        res.status(500).json({ error: "No orders found" });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({
        error: "An error occurred during fetching the orders",
        details: error.message,
      });
    }
  },
  updateOrder: async (req, res) => {
    try {
      const response = await orderService.updateOrder(req.body);
      if (response) {
        res.status(200).json({ response });
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({
        error: "An error occurred during updating the order",
        details: error.message,
      });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const response = await orderService.deleteOrder(req.params);
      if (response) {
        res.status(200).json({ response: "Order deleted successfully" });
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({
        error: "An error occurred during deleting the order",
        details: error.message,
      });
    }
  },
};

module.exports = orderController;
