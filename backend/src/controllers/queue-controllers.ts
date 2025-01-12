import mongoose from "mongoose";
import { Request, Response } from 'express';
import { queueModel } from '../models/queue.model'; // Import the queue model
import { userModel } from "../models/user.model";

export const getAllQueue = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await queueModel.find({});
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching users" });
  }
};


export const createQueue = async (req: Request, res: Response) => {
  try {
    const { specialization, description, weekly_schedule, status, is_lab_test } = req.body;

    // Validate required fields
    if (!specialization || !weekly_schedule || !description) {
      return res.status(400).json({ message: "Specialization, weekly schedule, and description are required!" });
    }

    // Validate specialization
    const validSpecializations = [      "OPD", "Ophthalmology", "Cardiology", "Orthopedics", "Dermatology", "Pediatrics", "Neurology", "Pathology", "Radiology",
      "Gynaecology", "Dentistry", "ENT", "Gastroenterology", "Hematology", "Oncology",
"Blood-test", "X-ray", "Ultrasound", "MRI", "CT Scan", ];

    if (!validSpecializations.includes(specialization)) {
      return res.status(400).json({ message: "Invalid specialization provided!" });
    }

    // Check if a queue with the same specialization already exists
    const existingQueue = await queueModel.findOne({ specialization });
    if (existingQueue) {
      return res.status(400).json({ message: "A queue with this specialization already exists!" });
    }

    // Validate weekly schedule
    if (!Array.isArray(weekly_schedule) || weekly_schedule.length === 0) {
      return res.status(400).json({ message: "Weekly schedule must contain at least one entry!" });
    }

    for (const entry of weekly_schedule) {
      const { doctors, day, start_time, end_time } = entry;

      // Validate doctors array
      if (!Array.isArray(doctors) || doctors.length === 0) {
        return res.status(400).json({ message: "Each schedule entry must have at least one doctor!" });
      }

      for (const doctor of doctors) {
        if (!mongoose.Types.ObjectId.isValid(doctor)) {
          return res.status(400).json({ message: `Invalid doctor ID: ${doctor}` });
        }
      }

      // Validate day
      const validDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      if (!validDays.includes(day)) {
        return res.status(400).json({ message: `Invalid day: ${day}` });
      }

      // Validate start_time and end_time
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Matches 24-hour format (HH:mm)
      if (!timeRegex.test(start_time) || !timeRegex.test(end_time)) {
        return res.status(400).json({ message: `Invalid time format for schedule entry: ${day}` });
      }

      if (start_time >= end_time) {
        return res.status(400).json({ message: `Start time must be before end time for: ${day}` });
      }
    }

    // Default status to "open" if not provided
    const queueStatus = status || "open";
    const validStatuses = ["open", "closed", "paused"];
    if (!validStatuses.includes(queueStatus)) {
      return res.status(400).json({ message: `Invalid status: ${queueStatus}` });
    }

    // Create and save the new queue
    const newQueue = new queueModel({
      specialization,
      description,
      weekly_schedule,
      status: queueStatus,
      is_lab_test: is_lab_test !== undefined ? is_lab_test : false // Use the provided value or default to false
    });

    const savedQueue = await newQueue.save();

    return res.status(201).json({
      message: "Queue created successfully!",
      queue: savedQueue,
    });
  } catch (error) {
    console.error("Error during queue creation:", error);
    return res.status(500).json({ message: "Something went wrong during queue creation!" });
  }
};

export const updateQueueStatus = async (req: Request, res: Response) => {
  try {
    const { queueId, status } = req.body;

    // Validate input
    if (!queueId || !status) {
      return res.status(400).json({ message: 'Queue ID and status are required!' });
    }

    // Validate status value
    const validStatuses = ['open', 'closed', 'paused'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Valid statuses are: ${validStatuses.join(', ')}` });
    }

    // Find and update the queue
    const updatedQueue = await queueModel.findByIdAndUpdate(
      queueId,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedQueue) {
      return res.status(404).json({ message: 'Queue not found!' });
    }

    return res.status(200).json({
      message: 'Queue status updated successfully!',
      queue: updatedQueue
    });
  } catch (error) {
    console.error('Error updating queue status:', error);
    return res.status(500).json({ message: 'Something went wrong during queue status update!' });
  }
};

export const getNonLabTestSpecializations = async (req: Request, res: Response) => {
  try {
    // Query the database for specializations where is_lab_test is false
    const specializations = await queueModel.find({ is_lab_test: false }, 'specialization');

    if (specializations.length === 0) {
      return res.status(404).json({ message: "No non-lab test specializations found." });
    }

    return res.status(200).json(specializations);
  } catch (error) {
    console.error("Error fetching non-lab test specializations:", error);
    return res.status(500).json({ message: "Error fetching non-lab test specializations" });
  }
};

export const getLabTestSpecializations = async (req: Request, res: Response) => {
  try {
    // Query the database for specializations where is_lab_test is true
    const specializations = await queueModel.find({ is_lab_test: true }, 'specialization');

    if (specializations.length === 0) {
      return res.status(404).json({ message: "No lab test specializations found." });
    }

    return res.status(200).json(specializations);
  } catch (error) {
    console.error("Error fetching lab test specializations:", error);
    return res.status(500).json({ message: "Error fetching lab test specializations" });
  }
};


export const getQueuesByDoctorId = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;

    // Validate the doctorId
    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ message: "Invalid doctor ID!" });
    }

    // Find queues where the doctorId is in the weekly_schedule.doctors array
    const queues = await queueModel.find({ 
      "weekly_schedule.doctors": doctorId 
    });

    if (queues.length === 0) {
      return res.status(404).json({ message: "No queues found for the given doctor ID!" });
    }

    return res.status(200).json({
      message: "Queues retrieved successfully!",
      queues,
    });
  } catch (error) {
    console.error("Error fetching queues by doctor ID:", error);
    return res.status(500).json({ message: "Something went wrong while fetching queues!" });
  }
};


export const getSpecializations = async (req: Request, res: Response) => {
  try {
    // Query the database for specialization and description
    const specializations = await queueModel.find({}, 'specialization description -_id'); // Exclude _id if not needed

    if (specializations.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No specializations found.',
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Specializations retrieved successfully.',
      data: specializations,
    });
  } catch (error) {
    console.error('Error fetching specializations:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve specializations.',
      error: error.message,
    });
  }
};

export const getQueueOfSpecialization = async (req: Request, res: Response) => {
  try {
    const { specialization } = req.params;

    // Fetch the first queue and populate doctors' details
    const queue = await queueModel
      .findOne({ specialization })
      .populate({
        path: "weekly_schedule.doctors",
        model: "user", // Reference the correct model name
        select: "name email date_of_birth sex phone_number", // Explicitly select fields
      });

    if (!queue) {
      return res.status(404).json({ message: "No queue found for this specialization." });
    }

    res.status(200).json(queue);
  } catch (error) {
    console.error("Error fetching queue:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
