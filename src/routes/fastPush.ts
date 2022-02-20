import express from "express";
import { channel } from "..";
import { publishToQueue } from "../services/MQPubService";

const router = express.Router();

// 깐부가 포스트를 업로드 하면 들어오게 되는 컨트롤러입니다.

router.post("/", (req, res) => {
  const queueName = req.body.queue_name;
  channel.assertQueue(queueName, { durable: true });
  const payload = req.body.payload;
  publishToQueue(queueName, payload);
  res.statusCode = 200;
  res.send(":)");
});

export default router;
