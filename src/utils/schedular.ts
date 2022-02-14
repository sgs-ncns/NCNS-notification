import { admin } from "..";
import { CATEGORY } from "../common/types";

const likeMap = new Map();
const commentMap = new Map();

type CATEGORY = typeof CATEGORY[keyof typeof CATEGORY];

export const schedule = (
  accountName: string,
  category: CATEGORY
  // postId: number
) => {
  if (likeMap.has(accountName) || commentMap.has(accountName)) {
    switch (category) {
      case CATEGORY.Like: {
        likeMap.set(accountName, likeMap.get(accountName) + 1);
        break;
      }
      case CATEGORY.Comment: {
        commentMap.set(accountName, commentMap.get(accountName) + 1);
        break;
      }
      default:
        return;
    }
  } else {
    //초기 한 번 실행
    switch (category) {
      case "like": {
        likeMap.set(accountName, 1);
        commentMap.set(accountName, 0);
        break;
      }
      case "comment": {
        commentMap.set(accountName, 1);
        likeMap.set(accountName, 0);
        break;
      }
      default:
        return;
    }
    schedular(accountName);
  }
  console.log("like", likeMap);
  console.log("comment", commentMap);
};

const schedular = (accountName: string) => {
  console.log("accountName schedular started");
  setTimeout(async () => {
    const message = {
      // token:
      // "fveDN6CIZEX1peRH6agkQy:APA91bGP94sI4T6mX8UOX95enGuVaAu4rBVAxqOU8HQNtPyynYeTW8255kJXocaHZU1aSpyCIQO2ighyiHSIFSrGXOdA8K4qhU1drSHXK3hbW72fuUSh7GaG9WyzLkxmkw4lCre6FlrW",
      topic: accountName,
      notification: {
        title: "kkanbustagram",
        body: `${accountName}님의 게시물에 좋아요 ${likeMap.get(
          accountName
        )}개와 댓글${commentMap.get(accountName)}개가 달렸습니다.`,
      },
    };
    try {
      const res = await admin.messaging().send(message);
      likeMap.delete(accountName);
      commentMap.delete(accountName);
      console.log("성공" + res);
      console.log(likeMap, commentMap);
      return;
    } catch (err) {
      console.log("보내기 실패 메시지:" + err);
    }
  }, 10000);
};
