import Normal from "../models/normal";

// 받은 알림을 몽고 DB에 저장하는 create 부분입니다.
export const saveLike = async (
  target: string,
  postId: number,
  category: string,
  likedName: string
) => {
  const normal = new Normal({
    targetName: target,
    postId: postId,
    category: category,
    likedName: likedName,
  });
  try {
    const res = await normal.save();
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const saveComment = async (
  target: string,
  postId: number,
  category: string,
  likedName: string
) => {
  const normal = new Normal({
    targetName: target,
    postId: postId,
    category: category,
    likedName: likedName,
  });
  try {
    const res = await normal.save();
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

// 이름 값으로 몽고 db에서 전체 select를 진행합니다.
export const getNotifyByName = async (name: string) => {
  const res = await Normal.find(
    { targetName: name }
    //   , (err: any, docs: any) => {
    //   console.log(docs);
    // }).sort({
    //   created_at: -1,
  );
  // console.log(resDto);
  return res;
};
