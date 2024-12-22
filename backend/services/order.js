const mongooseOrder = require("../models/order");
const kafka = require("../utils/kafka");
const invoice = require("../utils/invoice");

async function createOrder(orderParams) {
  try {
    const { userId, products } = orderParams;
    const newOrder = new mongooseOrder({ userId, products });
    await newOrder.save();

    if (newOrder) {
      try {
        await kafka.sendMessage("orders", {
          orderId: newOrder._id,
          userId,
          products,
        });
      } catch (kafkaError) {
        console.error("Kafka message sending failed:", kafkaError);
        // Kafka hatası durumunda siparişi yine de devam ettir
      }

      await invoice.createInvoice(newOrder._id);
      return newOrder;
    }
  } catch (error) {
    console.error("Order creation error:", error);
    throw error;
  }
}

async function getOrder(orderParams) {
  const { id } = orderParams;
  try {
    const order = await mongooseOrder.findById(id);
    return order;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}

async function getOrders() {
  try {
    const orders = await mongooseOrder.find();
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

async function updateOrder(orderParams) {
  const { id, userId, products } = orderParams;
  try {
    const order = await mongooseOrder.findById(id);
    if (order) {
      order.userId = userId;
      order.products = products;
      await order.save();
      return order;
    } else {
      console.error("Order not found");
      return null;
    }
  } catch (error) {
    console.error("Error updating order:", error);
    return null;
  }
}

async function deleteOrder(orderParams) {
  const { id } = orderParams;
  try {
    const deletedOrder = await mongooseOrder.findByIdAndDelete(id);
    return deletedOrder ? true : false;
  } catch (error) {
    console.error("Error deleting order:", error);
    return false;
  }
}

module.exports = {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder,
};
