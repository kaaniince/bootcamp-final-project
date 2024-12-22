const mongooseOrder = require("../models/order");
const kafka = require("../utils/kafka");
const { broadcastMessage } = require("./websocket");

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
          timestamp: new Date().toISOString(),
        });
        console.log("Order kafka message sent successfully");
      } catch (kafkaError) {
        console.log("Kafka message sending failed:", kafkaError);
      }

      // Send WebSocket notification
      broadcastMessage({
        type: "NEW_ORDER",
        message: `New order created with ID: ${newOrder._id}`,
        orderId: newOrder._id,
        timestamp: new Date().toISOString(),
      });
    }

    return newOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

async function getOrder(orderParams) {
  const { id } = orderParams;
  try {
    return await mongooseOrder.findById(id);
  } catch (error) {
    console.error("Error getting order:", error);
    throw error;
  }
}

async function getOrders() {
  try {
    return await mongooseOrder.find();
  } catch (error) {
    console.error("Error getting orders:", error);
    throw error;
  }
}

async function updateOrder(orderParams) {
  const { id, ...updateData } = orderParams;
  try {
    return await mongooseOrder.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
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
