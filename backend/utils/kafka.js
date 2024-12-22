const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [process.env.KAFKA_BROKERS || "kafka:29092"],
  retry: {
    initialRetryTime: 100,
    retries: 8,
  },
  connectionTimeout: 3000,
});

let producer = null;

const initKafka = async () => {
  try {
    producer = kafka.producer();
    await producer.connect();
    console.log("Successfully connected to Kafka");
    return producer;
  } catch (error) {
    console.error("Error connecting to Kafka:", error);
    return null;
  }
};

const sendMessage = async (topic, message) => {
  try {
    if (!producer || !producer.isConnected()) {
      console.log("Producer not connected, attempting to reconnect...");
      producer = await initKafka();
      if (!producer) {
        throw new Error("Failed to reconnect to Kafka");
      }
    }

    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log("Message sent successfully to Kafka");
  } catch (error) {
    console.error("Error sending message to Kafka:", error);
    throw error;
  }
};

initKafka().catch(console.error);

process.on("SIGTERM", async () => {
  if (producer) {
    try {
      await producer.disconnect();
      console.log("Disconnected from Kafka");
    } catch (error) {
      console.error("Error disconnecting from Kafka:", error);
    }
  }
  process.exit(0);
});

module.exports = {
  sendMessage,
  initKafka,
};
