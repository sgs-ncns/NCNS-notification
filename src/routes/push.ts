import express from "express";
import { CATEGORY } from "../common/types";
import {
  getNotifyByName,
  saveComment,
  saveLike,
} from "../services/notifyService";
import { schedule } from "../services/schedular";
import { likeRequestType } from "./types";

// api/notify/test -> fcm_message로 target token 값이 감.

const router = express.Router();

// 좋아요를 누르게 됬을 때 사용자에게 푸시를 주는 컨트롤러입니다.

router.post("/like", async (req, res) => {
  //   console.log(req.body.post_id);
  const accountName = req.body.account_name;
  const postId = req.body.post_id;
  const likedName = req.body.target_account_name;

  saveLike(accountName, postId, "like", likedName);
  schedule(accountName, postId, CATEGORY.Like);
  res.send("success :)");
});

router.post("/comment", (req, res) => {
  //   console.log(req.body.post_id);
  const accountName = req.body.account_name;
  const postId = req.body.post_id;
  const commentedName = req.body.target_account_name;

  saveComment(accountName, postId, "comment", commentedName);
  schedule(accountName, postId, CATEGORY.Comment);
  res.send("success :)");
});

// 댓글을 달게 됬을 때 사용자에게 푸시를 주는 컨트롤러입니다.
router.get("/:accountName", async (req, res) => {
  const accountName = req.params.accountName;

  try {
    console.log(accountName);
    const result = await getNotifyByName(accountName);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
  }
});

export default router;
