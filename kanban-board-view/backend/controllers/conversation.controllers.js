import {Conversation }from "../models/conversation.models.js";

export const createConversation = async (req, res) => {
  try {
    const { access_code, password, boards, users, createdBy } = req.body;
    const conversation = new Conversation({
      access_code,
      password,
      boards,
      users,
      createdBy,
    });
    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id)
      .populate("boards")
      .populate("users")
      .populate("createdBy");
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateConversation = async (req, res) => {
  try {
    const { access_code, password, boards, users } = req.body;
    const conversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      { access_code, password, boards, users },
      { new: true }
    );
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findByIdAndDelete(req.params.id);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    res.json({ message: "Conversation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
