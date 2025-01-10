import { Request, Response } from 'express';
import { queueModel } from '../models/queue.model'; // Import the queue model

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
    const { specialization, doctors, weekly_schedule, status } = req.body;

    // Validate required fields
    if (!specialization || !doctors || !weekly_schedule || !status) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    // Validate if all doctors are valid ObjectId
    if (!Array.isArray(doctors) || doctors.length === 0) {
      return res.status(400).json({ message: 'At least one doctor must be provided.' });
    }

    // Create the new queue with provided details
    const newQueue = new queueModel({
      specialization,
      doctors,
      weekly_schedule,
      status
    });

    // Save the new queue to the database
    const savedQueue = await newQueue.save();

    return res.status(201).json({
      message: 'Queue created successfully!',
      queue: savedQueue
    });
  } catch (error) {
    console.error('Error during queue creation:', error);
    return res.status(500).json({ message: 'Something went wrong during queue creation!' });
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

