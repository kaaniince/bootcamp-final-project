const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-kafka-producer2",
  brokers: [process.env.KAFKA_BROKERS || "kafka:9092"],
  retry: {
    initialRetryTime: 100,
    retries: 8,
  },
  connectionTimeout: 3000,
});

const producer = kafka.producer();

const initKafka = async () => {
  try {
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
      console.error("Kafka producer not initialized");
      return;
    }

    await producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log("Message sent successfully to Kafka");
  } catch (error) {
    console.error("Error sending message to Kafka:", error);
  }
};

module.exports = { initKafka, sendMessage };
