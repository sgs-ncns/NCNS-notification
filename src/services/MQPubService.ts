import { channel } from "..";

// Rabbit MQ는 버퍼 형식의 페이로드를 담아야만 큐에 전송이 가능합니다.
// 컨트롤러에서 전달 받은 인자를 버퍼화 시켜 페이로드에 담아 큐로 전송합니다.

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
