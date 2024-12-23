const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-kafka-producer2",
  brokers: ["localhost:9092"],
  retry: {
    initialRetryTime: 100,
    retries: 8,
  },
});

const consumer = kafka.consumer({ groupId: "my-kafka-producer2" });

const run = async () => {
  try {
    await consumer.connect();
    console.log("Successfully connected to Kafka");
    await consumer.subscribe({ topic: "order", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          await createInvoice(message);
          console.log({
            partition,
            offset: message.offset,
            value: message.value.toString(),
          });
        } catch (err) {
          console.error("Error processing message:", err);
        }
      },
    });
  } catch (err) {
    console.error("Failed to start consumer:", err);
    // Optionally implement reconnection logic here
    await consumer.disconnect();
    // Maybe wait a bit before retrying
    setTimeout(run, 5000);
  }
};

async function createInvoice(message) {
  console.log(message, "create invoice");
  return true;
}

run().catch(console.error);
