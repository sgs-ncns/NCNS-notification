import express from "express";
import { CATEGORY } from "../common/types";
import { getNotifyByName, saveNotify } from "../services/notifyService";
import { schedule } from "../services/schedular";

// api/notify/test -> fcm_message로 target token 값이 감.

const router = express.Router();

router.post("/like", async (req, res) => {
  //   console.log(req.body.post_id);
  const accountName = req.body.account_name;

  saveNotify(accountName);
  schedule(accountName, CATEGORY.Like);
  res.send("success :)");
});

router.post("/comment", (req, res) => {
  //   console.log(req.body.post_id);
  const accountName = req.body.account_name;

  schedule(accountName, CATEGORY.Comment);
  res.send("success :)");
});

router.get("/:accountName", async (req, res) => {
  const accountName = req.params.accountName;
  try {
    const result = await getNotifyByName(accountName);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
  }
});

export default router;
