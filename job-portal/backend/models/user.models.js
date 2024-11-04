import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Basic authentication information
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },

  // Profile information
  bio: { type: String },
  phoneNumber: { type: String },
  linkedinProfile: { type: String },
  portfolioURL: { type: String },
  resumeURL: { type: String },

  // Job preferences
  preferredJobType: [String],
  desiredSalary: Number,
  availability: {
    type: String,
    enum: ["Actively looking", "Open to offers", "Not looking"],
  },

  // Education and professional background
  education: [
    {
      degree: { type: String },
      institution: { type: String },
      year: { type: Number },
      grade: { type: String },
    },
  ],
  location: { type: [String] },
  experience: { type: String },
  domainOfInterest: { type: [String], default: ["Computer Science"] },
  skillset: { type: [String] },

  // Job tracking
  savedJobTitles: { type: [mongoose.Schema.Types.ObjectId], ref: "Job" },
  appliedJobTitles: { type: [mongoose.Schema.Types.ObjectId], ref: "Job" },
  applicationCount: { type: Number, default: 0 },
});

export const User = mongoose.model("User", userSchema);
