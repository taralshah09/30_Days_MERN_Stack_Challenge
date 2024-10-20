import express from "express";
import { Transaction } from "../models/transaction.models.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  const { mode, amount, createdBy } = req.body;

  const transaction = new Transaction({ mode, amount, createdBy });
  if (!transaction) {
    return res.status(400).json({ message: "Unable to add the transaction!" });
  }
  await transaction.save();

  return res
    .status(200)
    .json({
      message: "Transaction created successfully!",
      transaction: transaction,
    });
});

export { router };
