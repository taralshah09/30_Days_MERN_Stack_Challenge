import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  // Job details
  title: { type: String, required: true },
  location: { type: String, required: true },
  experience: { type: Number, required: true },
  description: { type: String, required: true },
  salary: { type: [Number], required: true }, // salary range
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship"],
    required: true,
  },
  skillsRequired: { type: [String] },
  employmentType: { 
    type: String, 
    enum: ["Remote", "In-office", "Hybrid"] 
  },
  domain: { type: String, default: "Computer Science" },

  // Company details
  companyName: { type: String },
  companyWebsite: { type: String },

  // Application tracker
  postedDate: { type: Date, default: Date.now },
  applicationDeadline: { type: Date },
  applicationCount: { type: Number, default: 0 },
});

export const Job = mongoose.model("Job", jobSchema);
