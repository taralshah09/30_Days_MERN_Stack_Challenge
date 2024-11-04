import { Job } from "../models/jobs.models.js";

export const createJobs = async (req, res) => {
  try {
    const {
      title,
      location,
      experience,
      description,
      salary,
      jobType,
      skillsRequired,
      employmentType,
      domain,
      companyName,
      companyWebsite,
    } = req.body;

    const job = new Job({
      title,
      location,
      experience,
      description,
      salary,
      jobType,
      skillsRequired,
      employmentType,
      domain,
      companyName,
      companyWebsite,
    });

    if (!job) {
      return res.status(400).json({ message: "Unable to create a job-post" });
    }

    await job.save();
    return res.status(200).json({ message: "Job created successfully", job });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, error in posting job",
      error: error.message,
    });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    if (!jobs) {
      return res.status(400).json({ message: "Unable to fetch all the jobs!" });
    }

    return res.status(200).json({ message: "Jobs fetched successfully", jobs });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong in fetching jobs",
      error: error.message,
    });
  }
};

export const editJobs = async (req, res) => {
  const jobId = req.params.id;
  const updateFields = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res
      .status(200)
      .json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating job", error: error.message });
  }
};

export const deleteJob = async (req, res) => {
  const jobId = req.params.id; // Get the job ID from the request parameters

  try {
    // Find the job by ID and delete it
    const deletedJob = await Job.findByIdAndDelete(jobId);

    // If the job is not found, send a 404 response
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Respond with a success message
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    // Handle any errors and send a 500 response
    res
      .status(500)
      .json({ message: "Error deleting job", error: error.message });
  }
};
