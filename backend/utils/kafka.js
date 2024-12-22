const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [process.env.KAFKA_BROKERS || "kafka:29092"],
  retry: {
    initialRetryTime: 100,
    retries: 8,
  },
  connectionTimeout: 10000,
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
    if (!producer) {
      await initKafka();
    }

    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });

    console.log(`Message sent successfully to topic: ${topic}`);
    return true;
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
