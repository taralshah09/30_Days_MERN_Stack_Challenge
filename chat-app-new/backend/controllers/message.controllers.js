import { Conversation } from "../models/conversation.models.js";
import { Message } from "../models/message.models.js";
import { getReceiverSocketId, io } from "../SocketIO/index.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await new Conversation({
        members: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId: senderId,
      receiverId: receiverId,
      message: message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // await newMessage.save();
    // await conversation.save();

    await Promise.all([conversation.save(), newMessage.save()]);
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(200).json({
      message: newMessage
      
    });
  } catch (error) {
    console.log("Error in sending message  : ", error);
    return res
      .status(500)
      .json({ message: "Error in sending message", error: error });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages");
    if (!conversation) {
      return res.status(201).json([]);
    }

    const messages = conversation.messages;
    res.status(201).json(messages);
  } catch (error) {
    console.log("Error in getting message  : ", error);
    return res
      .status(500)
      .json({ message: "Error in getting message", error: error });
  }
};
