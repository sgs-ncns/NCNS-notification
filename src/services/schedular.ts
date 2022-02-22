import { admin } from "..";
import { CATEGORY } from "../common/types";

// 자체적으로 만든 배치처리 로직입니다.
// like map과 comment map이 전역으로 존재하며
// schedule 함수는 만약 맵에 인자로 전달 받은 accountName이 존재하면 count를 증가시키고
// 없다면 schedular 함수를 호출하여 로직을 진행합니다.

const likeMap = new Map();
const commentMap = new Map();

type CATEGORY = typeof CATEGORY[keyof typeof CATEGORY];

export const schedule = (
  accountName: string,
  postId: number,
  category: CATEGORY
  // postId: number
) => {
  if (likeMap.has(postId) || commentMap.has(postId)) {
    switch (category) {
      case CATEGORY.Like: {
        likeMap.set(postId, likeMap.get(postId) + 1);
        break;
      }
      case CATEGORY.Comment: {
        commentMap.set(postId, commentMap.get(postId) + 1);
        break;
      }
      default:
        return;
    }
  } else {
    //초기 한 번 실행
    switch (category) {
      case "like": {
        likeMap.set(postId, 1);
        commentMap.set(postId, 0);
        break;
      }
      case "comment": {
        commentMap.set(postId, 1);
        likeMap.set(postId, 0);
        break;
      }
      default:
        return;
    }
    schedular(postId, accountName);
  }
};

// schedular 함수는 setTimeout 함수를 통해 일정 시간이 지나면
// 콜백 함수를 실행합니다.
const schedular = (postId: number, accountName: string) => {
  console.log("accountName schedular started");
  let timeCount = 0;
  let timerId = setInterval(() => {console.log(++timeCount)}, 1000);
  setTimeout(() => clearInterval(timerId), 10000);
  setTimeout(async () => {
    let content:string;
    if(commentMap.get(postId) === 0) {
      content = `${accountName}님의 게시물에 좋아요 ${likeMap.get(postId)}개가 달렸습니다.`
    } else if(likeMap.get(postId) === 0) {
      content = `${accountName}님의 게시물에 댓글 ${commentMap.get(postId)}개가 달렸습니다.`
    } else {
      content = `${accountName}님의 게시물에 좋아요 ${likeMap.get(postId)}개와 댓글${commentMap.get(postId)}개가 달렸습니다.`
    }
    const message = {
      topic: accountName,
      notification: {
        title: "kkanbustagram",
        body: content
      },
    };
    try {
      // 일정 시간 동안 map에 담긴 좋아요와 댓글 개수를 FCM으로 전송합니다.
      const res = await admin.messaging().send(message);
      likeMap.delete(postId);
      commentMap.delete(postId);
      console.log("send to FCM");
      return;
    } catch (err) {
      console.log("보내기 실패 메시지:" + err);
    }
  }, 10000);
};
