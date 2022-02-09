import Normal from "../models/normal";

export const saveNotify = async (target: string) => {
  const normal = new Normal({ target_name: target });
  try {
    const res = await normal.save();
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const getNotifyByName = async (name: string) => {
  return await Normal.find({ target_name: name });
};
