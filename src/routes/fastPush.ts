import express from "express";
import { channel } from "..";
import { publishToQueue } from "../services/MQPubService";

const router = express.Router();

router.post("/", (req, res) => {
  const queueName = req.body.queue_name;
  channel.assertQueue(queueName, { durable: true });
  const payload = req.body.payload;
  publishToQueue(queueName, payload);
  res.statusCode = 200;
  //   res.data = { "message-sent": true };
  res.send(":)");
});

export default router;
