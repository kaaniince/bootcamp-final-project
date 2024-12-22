const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-kafka-producer2",
  brokers: [process.env.KAFKA_BROKERS || "kafka:9092"],
  retry: {
    initialRetryTime: 100,
    retries: 3,
  },
});

const producer = kafka.producer();

async function sendMessage(topic, message) {
  await producer.connect();
  await producer.send({
    topic: topic,
    messages: [{ value: message }],
  });
}

module.exports = { sendMessage };
