import { populate } from "dotenv";
import { Conversation } from "../models/conversation.models.js";
import { Message } from "../models/message.models.js";
import mongoose from "mongoose";
import { getReceiverSocketId } from "../SocketIO/server.js";

export const sendMessage = async (req, res) => {
  console.log("Message payload received:", req.body);  // Log message payload
  console.log("Receiver ID (from params):", req.params.id);  // Log receiver ID
  console.log("Sender ID (from user):", req.user.id);  // Log sender ID (assuming req.user is populated)

  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; // This should match your route parameter
    const senderId = req.user.id;

    // Validate that the message is present
    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sending message:", error); // Log full error
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id;

    // Ensure both senderId and chatUser are valid ObjectIds -> validation
    if (!mongoose.Types.ObjectId.isValid(chatUser)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Find the conversation between the two users and populate the messages
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages");

    // If no conversation exists, return an empty array
    if (!conversation) {
      return res.status(201).json([]);
    }

    // Get the messages from the conversation
    const messages = conversation.messages;

    // Return the messages
    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getting message: " + error);
    res.status(500).json({ error: "Internal server error" });
  }
};
