const { redisCon } = require("../utils/redis");

const CART_PREFIX = "cart:";

const basketService = {
  async getRedisClient() {
    return await redisCon();
  },

  async getCart(userId) {
    const client = await this.getRedisClient();
    const cartKey = CART_PREFIX + userId;

    try {
      const cartData = await client.get(cartKey);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error("Error getting cart from Redis:", error);
      throw error;
    }
  },

  async addToCart(userId, product) {
    const client = await this.getRedisClient();
    const cartKey = CART_PREFIX + userId;

    try {
      let cart = await this.getCart(userId);
      const existingProductIndex = cart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex >= 0) {
        cart[existingProductIndex].amount += 1;
      } else {
        cart.push({ ...product, amount: 1 });
      }

      await client.set(cartKey, JSON.stringify(cart));
      return cart;
    } catch (error) {
      console.error("Error adding to cart in Redis:", error);
      throw error;
    }
  },

  async removeFromCart(userId, productId) {
    const client = await this.getRedisClient();
    const cartKey = CART_PREFIX + userId;

    try {
      let cart = await this.getCart(userId);
      cart = cart.filter((item) => item.id !== productId);
      await client.set(cartKey, JSON.stringify(cart));
      return cart;
    } catch (error) {
      console.error("Error removing from cart in Redis:", error);
      throw error;
    }
  },

  async clearCart(userId) {
    const client = await this.getRedisClient();
    const cartKey = CART_PREFIX + userId;

    try {
      await client.del(cartKey);
      return true;
    } catch (error) {
      console.error("Error clearing cart in Redis:", error);
      throw error;
    }
  },

  async updateQuantity(userId, productId, action) {
    const client = await this.getRedisClient();
    const cartKey = CART_PREFIX + userId;

    try {
      let cart = await this.getCart(userId);
      const productIndex = cart.findIndex((item) => item.id === productId);

      if (productIndex >= 0) {
        if (action === "increase") {
          cart[productIndex].amount += 1;
        } else if (action === "decrease") {
          if (cart[productIndex].amount > 1) {
            cart[productIndex].amount -= 1;
          } else {
            cart = cart.filter((item) => item.id !== productId);
          }
        }
        await client.set(cartKey, JSON.stringify(cart));
      }

      return cart;
    } catch (error) {
      console.error("Error updating quantity in Redis:", error);
      throw error;
    }
  },
};

module.exports = basketService;
