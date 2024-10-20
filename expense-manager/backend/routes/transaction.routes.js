import express from "express";
import { Transaction } from "../models/transaction.models.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  const { mode, amount, createdBy, description } = req.body;

  const transaction = new Transaction({ mode, amount, description, createdBy });
  if (!transaction) {
    return res.status(400).json({ message: "Unable to add the transaction!" });
  }
  await transaction.save();

  return res.status(200).json({
    message: "Transaction created successfully!",
    transaction: transaction,
  });
});

// Accessing the session to fetch user._id for filtering the incomes of the logged-in User
router.get("/income", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const userId = req.user._id; // User ID from session (set by Passport)
    const transactions = await Transaction.find({
      mode: "income",
      createdBy: userId,
    });

    if (!transactions.length) {
      return res.status(404).json({
        message: "No income transactions found for this user.",
      });
    }

    res.status(200).json({
      message: "Income transactions fetched successfully!",
      transactions,
    });
  } catch (error) {
    console.error("Error fetching income transactions:", error);
    res.status(500).json({
      message: "Something went wrong while fetching income transactions.",
    });
  }
});

router.delete("/income/delete/:id", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const { id } = req.params;

    const userId = req.user._id; // User ID from session (set by Passport)
    const transaction = await Transaction.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!transaction) {
      return res.status(404).json({
        message: "No such transaction for income found.",
      });
    }

    res.status(200).json({
      message: "Income transactions deleted successfully!",
      transaction,
    });
  } catch (error) {
    console.error("Error deleting income transactions:", error);
    res.status(500).json({
      message: "Something went wrong while fetching income transactions.",
    });
  }
});

router.get("/expense", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const userId = req.user._id; // User ID from session (set by Passport)
    const transactions = await Transaction.find({
      mode: "expense",
      createdBy: userId,
    });

    if (!transactions.length) {
      return res.status(404).json({
        message: "No expense transactions found for this user.",
      });
    }

    res.status(200).json({
      message: "Expense transactions fetched successfully!",
      transactions,
    });
  } catch (error) {
    console.error("Error fetching expense transactions:", error);
    res.status(500).json({
      message: "Something went wrong while fetching expense transactions.",
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authorized" });
    }
    const userId = req.user._id;
    const transactions = await Transaction.find({
      createdBy: userId,
    });

    if (!transactions.length) {
      return res.status(404).json({
        message: "No transactions found for this user.",
      });
    }

    res.status(200).json({
      message: "all transactions fetched successfully!",
      transactions,
    });
  } catch (error) {
    console.error("Error fetching all transactions:", error);
    res.status(500).json({
      message: "Something went wrong while fetching all transactions.",
    });
  }
});

export { router };
