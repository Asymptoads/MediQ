import mongoose from "mongoose";
import { Request, Response } from 'express';
import { queueModel } from '../models/queue.model'; // Import the queue model

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

export const getQueueById = async (req: Request, res: Response) => {
  try {
    const { queueId } = req.params;

    // Validate the queue ID
    if (!queueId) {
      return res.status(400).json({ message: 'Queue ID is required!' });
    }

    // Find the queue by its ID
    const queue = await queueModel
    .findById(queueId)
    .populate('doctors', 'name email phone_number') // Populates doctors' details
    .exec();

    if (!queue) {
      return res.status(404).json({ message: 'Queue not found!' });
    }

    return res.status(200).json({
      message: 'Queue retrieved successfully!',
      queue,
    });
  } catch (error) {
    console.error('Error retrieving queue by ID:', error);
    return res.status(500).json({ message: 'Something went wrong while retrieving the queue!' });
  }
};

export const createQueue = async (req: Request, res: Response) => {
  try {
    const { specialization, weekly_schedule, status } = req.body;

    // Validate required fields
    if (!specialization || !weekly_schedule) {
      return res.status(400).json({ message: "Specialization and weekly schedule are required!" });
    }

    // Validate specialization
    const validSpecializations = [
      "OPD", "Eye", "Ear", "Cardiology", "Orthopedics", "Dermatology", "Neurology",
      "X-ray", "Ultrasound", "MRI", "CT Scan", "Pathology", "Radiology", "Pediatrics",
      "Gynaecology", "Dentistry", "ENT", "Gastroenterology", "Hematology", "Oncology",
      "Rheumatology", "Urology", "Pulmonology", "Endocrinology"
    ];

    if (!validSpecializations.includes(specialization)) {
      return res.status(400).json({ message: "Invalid specialization provided!" });
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
      weekly_schedule,
      status: queueStatus,
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

// Get queues by specialization
export const getBySpecialization = async (req: Request, res: Response) => {
  try {
    const { specialization } = req.params;

    // Find queues by specialization
    const queues = await queueModel
    .find({ specialization })
    .populate('doctors', 'name email') // Populate doctor information (name, email)
    .exec();

    if (queues.length === 0) {
      return res.status(404).json({ message: 'No queues found for this specialization' });
    }

    return res.status(200).json(queues);
  } catch (error) {
    console.error("Error fetching queues by specialization:", error);
    return res.status(500).json({ message: 'Error fetching queues' });
  }
};

// Get queues by doctor
export const getByDoctor = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;

    // Find queues that contain the specified doctor
    const queues = await queueModel
    .find({ doctors: doctorId })
    .populate('doctors', 'name email') // Populate doctor information (name, email)
    .exec();

    if (queues.length === 0) {
      return res.status(404).json({ message: 'No queues found for this doctor' });
    }

    return res.status(200).json(queues);
  } catch (error) {
    console.error("Error fetching queues by doctor:", error);
    return res.status(500).json({ message: 'Error fetching queues' });
  }
};

