//  export const createmessage =async(req,res,next)=>{

import MessageModel from "../../DB/models/message.model.js";
import UserModel from "../../DB/models/user.model.js";

export const createmessage = async (req, res, next) => {
  try {
    const { content, userId } = req.body;

    // ✅ التشيك على وجود اليوزر وعدم حذفه
    const user = await UserModel.findOne({
      _id: userId,
      isDeleted: { $ne: true },
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or has been deleted" });
    }

    const message = await MessageModel.create({
      content: content.trim(),
      userId,
    });

    res.status(201).json({
      message: "Message created successfully",
      data: message,
    });
  } catch (error) {
    next(error);
  }
};
export const listMessages = async (req, res, next) => {
  try {
    const messages = await MessageModel.find({
      userId: req?.user?._id,
    }).populate("userId");

    return res.status(200).json({ message: "success", messages });
  } catch (error) {
    next(error);
  }
};

// ✅ عرض رسالة واحدة
export const getMessage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const message = await MessageModel.findOne({
      userId: req?.user?._id,
      _id: id, // لازم _id مش id
    }).populate([{
      path:"userId",
      select:"Name email"
    }]);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    return res.status(200).json({ message: "success", data: message });
  } catch (error) {
    next(error);
  }
};
 // مسح كل الرسايل
export const deleteAllMessages = async (req, res, next) => {
  try {
    await MessageModel.deleteMany({ userId: req?.user?._id });
    res.status(200).json({ message: "All messages deleted successfully" });
  } catch (error) {
    next(error);
  }
};