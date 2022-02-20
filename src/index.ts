import express from "express";
import cors from "cors";
import pushRouter from "./routes/push";
import fastPushRouter from "./routes/fastPush";
import amqp from "amqplib/callback_api.js";
import { MONGO_CONN_URL, MQ_CONN_URL } from "./config/env";

const app = express();
const port = "8000";

/* Mongo DB를 초기화 하는 파트입니다. */
const mongoose = require("mongoose");
mongoose
  .connect(MONGO_CONN_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err: any) => {
    console.log(err);
  });

/* FCM initializing */
export const admin = require("firebase-admin");
const serviceAccount = require("./config/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

/* RabbitMQ initializing */
export let channel: amqp.Channel;
amqp.connect(MQ_CONN_URL, function (err, conn) {
  conn.createChannel(function (err, ch) {
    channel = ch;
  });
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/notify", pushRouter);
app.use("/api/notify/kkanbu", fastPushRouter);

app.listen(port, () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: ${port}🛡️
  ################################################
`);
});
