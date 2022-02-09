import { channel } from "..";

export const publishToQueue = (queueName: string, payload: string) => {
  //   console.log(new Buffer(data));
  //   const data = { payload };
  const buffer = Buffer.from(payload);
  console.log(queueName, payload);
  const res = channel.sendToQueue(queueName, buffer);
  console.log(res);
};

process.on("exit", (code) => {
  //   channel.close((err: any) => console.log(err));
  console.log(`Closing rabbitmq channel`);
});
