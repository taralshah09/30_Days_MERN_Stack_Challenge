import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    tags: {
      type: [String],
      required: true,
      validate: {
        validator: function (tags) {
          // Ensure there are no duplicate tags
          return tags.length === new Set(tags).size;
        },
        message: "Tags must be unique."
      },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to ensure unique tags
notesSchema.pre("save", function (next) {
  this.tags = [...new Set(this.tags)]; // Remove duplicates
  next();
});

export const Notes = mongoose.model("Notes", notesSchema);