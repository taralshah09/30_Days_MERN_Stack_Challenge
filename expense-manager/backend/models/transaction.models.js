import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    mode: {
        type: String,
        enum: ["income", "expense"],
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, // Corrected this part
        ref: "User",
        required: true, // Optionally add if this field must always be present
    },
}, { timestamps: true });

export const Transaction = mongoose.model("Transaction", transactionSchema); // Removed 'new' here
