import express from "express";
import { appointmentModel } from "../models/appointment.model";
import { queueModel } from "../models/queue.model";
import { estimatedTimeModel } from "../models/estimated-time.model";
import mongoose from "mongoose";

export const createAppointment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId, specialization, category, schedule_id, } = req.body;

    // Validate if the IDs are valid MongoDB ObjectIds
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(schedule_id)) {
      return res.status(400).json({ message: "Invalid user ID or schedule ID format" });
    }

    // Check if the queue exists based on the specialization
    const queue = await queueModel.findOne({ specialization }).lean(); // Use lean() for better performance
    if (!queue) {
      return res.status(404).json({ message: "Queue not found" });
    }

    // Validate the provided schedule_id against the queue's weekly schedule
    const validSchedule = queue.weekly_schedule.find(
      (entry) => entry._id.toString() === schedule_id
    );

    if (!validSchedule) {
      return res.status(400).json({ message: "Invalid schedule for the selected queue" });
    }

    // Check if the user already has an appointment in the same queue that is not completed
    const existingAppointment = await appointmentModel.findOne({
      user_id: userId,
      queue_id: queue._id,
      is_completed: false,
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "User already has an active appointment in this queue",
      });
    }

    // Create a new appointment with the validated schedule
    const appointment = new appointmentModel({
      user_id: userId,
      queue_id: queue._id,
      category: category,
      schedule: validSchedule, // Include the validated schedule
    });

    await appointment.save();

    return res.status(200).json({
      message: "User assigned to queue successfully",
      appointment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// Controller function to get all appointments filtered by queue_id, sorted by registered_at,
// excluding completed and suspended appointments
export const getAppointments = async ( req: express.Request, res: express.Response) => {
  try {
    const { queue_id } = req.params; // Extract queue_id from URL parameter

    // Validate if queue_id is provided
    if (!queue_id) {
      return res.status(400).json({ error: 'queue_id is required' });
    }

    // Fetch appointments filtered by queue_id and excluding completed and suspended
    const appointments = await appointmentModel.find({
      queue_id,               // Filter by queue_id
      is_operated: false,     // Exclude operated appointments
      is_completed: false,    // Exclude completed appointments
      is_suspended: false     // Exclude suspended appointments
    })
    .sort({ registered_at: 1 });  // Sort by registered_at in ascending order

    // Return the appointments if found
    if (appointments.length > 0) {
      return res.status(200).json(appointments);
    } else {
      return res.status(404).json({ message: 'No appointments found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getSuspendedAppointments = async ( req: express.Request, res: express.Response) => {
  try {
    const { queue_id } = req.params; // Extract queue_id from URL parameter

    // Validate if queue_id is provided
    if (!queue_id) {
      return res.status(400).json({ error: "queue_id is required" });
    }

    // Fetch appointments filtered by queue_id and is_suspended=true
    const suspendedAppointments = await appointmentModel
      .find({
        queue_id,           // Filter by queue_id
        is_suspended: true, // Include only suspended appointments
      })
      .sort({ suspended_at: 1 }); // Sort by suspended_at in ascending order

    // Return the appointments if found
    if (suspendedAppointments.length > 0) {
      return res.status(200).json(suspendedAppointments);
    } else {
      return res.status(404).json({ message: "No suspended appointments found" });
    }
  } catch (error) {
    console.error("Error fetching suspended appointments:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getAppointmentsByUserId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { status, user_id } = req.params;

    // Validate if the user_id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    console.log(status)
    let statusFilter = {};
    if (status === 'completed') {
      statusFilter = { is_completed: true };
    } else if (status === 'not_completed') {
      statusFilter = { is_completed: false };
    } else if (status !== 'all') {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const appointments = await appointmentModel.find({
      user_id,
      ...statusFilter,  // Apply the status filter if provided
    }).sort({ registered_at: 1 });  // Sort by registered_at in ascending order

    // If no appointments are found for the user
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for this user' });
    }

    // Return the appointments
    return res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export const markAppointmentAsCompleted = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { appointment_id } = req.params; // Extract appointment_id from URL parameter

    // Find the appointment by appointment_id
    const appointment = await appointmentModel.findById(appointment_id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    const now = new Date();

    // Mark appointment as completed
    appointment.is_completed = true;
    appointment.completed_at = now;

    // Save the updated appointment
    await appointment.save();

    // Return the updated appointment as the response
    return res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const markAppointmentAsSuspended = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { appointment_id } = req.params; // Extract appointment_id from URL parameter

    // Find the appointment by appointment_id
    const appointment = await appointmentModel.findById(appointment_id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    const now = new Date();

    // Mark appointment as suspended
    appointment.is_suspended = true;
    appointment.suspended_at = now;

    // Save the updated appointment
    await appointment.save();

    // Return the updated appointment as the response
    return res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const markAppointmentAsOperated = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { appointment_id } = req.params; // Extract appointment_id from URL parameter
    const { doctor_id } = req.body; // Get doctor_id from the request body

    // Validate doctor_id for operated status
    if (!doctor_id) {
      return res
      .status(400)
      .json({ error: "Doctor ID is required for operated status" });
    }

    // Find the appointment by appointment_id
    const appointment = await appointmentModel.findById(appointment_id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    const now = new Date();

    // Find the queue associated with the appointment
    const queue = await queueModel.findById(appointment.queue_id).lean(); // Use `lean` to get plain JavaScript objects
    if (!queue) {
      return res.status(404).json({ error: "Queue not found" });
    }

    // Explicitly type the `weekly_schedule` and `schedule` objects
    type WeeklySchedule = {
      doctors: mongoose.Types.ObjectId[];
      day: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
      start_time: string;
      end_time: string;
    };

    const appointmentSchedule: WeeklySchedule = appointment.schedule as unknown as WeeklySchedule;

    // Check if the schedule exists in the queue's weekly_schedule
    const validSchedule = queue.weekly_schedule.find((entry: WeeklySchedule) => entry.day === appointmentSchedule.day && entry.start_time === appointmentSchedule.start_time && entry.end_time === appointmentSchedule.end_time);

    if (!validSchedule) {
      return res
      .status(400)
      .json({ error: "The schedule for the appointment is invalid" });
    }

    // Check if the doctor is part of the specific schedule's doctors
    if (!validSchedule.doctors.includes(doctor_id)) {
      return res
      .status(400)
      .json({ error: "Doctor is not part of this schedule" });
    }

    // Mark appointment as operated
    appointment.is_operated = true;
    appointment.operated_at = now;
    appointment.operated_by = doctor_id; // Set the doctor who performed the operation

    // Save the updated appointment
    await appointment.save();

    // Return the updated appointment as the response
    return res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const queueStatusForUser = async ( req: express.Request, res: express.Response) => {
  try {
    const { queue_id, user_id } = req.params; // Extract queue_id and user_id from URL parameters

    // Validate if queue_id and user_id are provided
    if (!queue_id) {
      return res.status(400).json({ error: "queue_id is required" });
    }
    if (!user_id) {
      return res.status(400).json({ error: "user_id is required" });
    }

    // Check if the user has an appointment in this queue
    const userAppointment = await appointmentModel.findOne({
      queue_id,
      user_id,
    });

    if (!userAppointment) {
      return res.status(404).json({
        error: "The user does not have an appointment in this queue.",
      });
    }

    // Get all active appointments in the queue, sorted by registered_at
    const activeAppointments = await appointmentModel
    .find({
      queue_id,
      is_operated: false,
      is_completed: false,
      is_suspended: false,
    })
    .sort({ registered_at: 1 });

    // Get the number of users before the current user
    const userIndex = activeAppointments.findIndex(
      (appointment) => appointment.user_id.toString() === user_id
    );
    const usersBefore = userIndex;

    // Get the number of suspended users in the queue
    const suspendedCount = await appointmentModel.countDocuments({
      queue_id,
      is_suspended: true,
    });

    // Calculate the estimated wait time for each user
    const estimatedTimes = await Promise.all(
      activeAppointments.map(async (appointment) => {
        const estimatedTime = await estimatedTimeModel.findOne({
          category: appointment.category,
          queue_id,
        });

        const averageTime = estimatedTime ? estimatedTime.average_time : 0;

        return {
          user_id: appointment.user_id,
          estimated_time: averageTime,
        };
      })
    );

    // Calculate the total wait time for the current user
    const userWaitTime = estimatedTimes
    .slice(0, usersBefore)
    .reduce((acc, curr) => acc + curr.estimated_time, 0);

    // Get the user currently being operated (if any)
    const userBeingOperated = await appointmentModel.findOne({
      queue_id,
      is_operated: true,
    });

    let operatingUserEstimatedTime = 0;
    let operatedAt = null;

    if (userBeingOperated) {
      const estimatedTimeForUserBeingOperated = await estimatedTimeModel.findOne({
        category: userBeingOperated.category,
        queue_id,
      });

      operatingUserEstimatedTime =
        estimatedTimeForUserBeingOperated?.average_time || 0;

      // Get the operated_at timestamp
      operatedAt = userBeingOperated.operated_at;
    }

    // Return the results
    return res.status(200).json({
      user_appointment: userAppointment,
      users_before: usersBefore,
      suspended_count: suspendedCount,
      total_wait_time: userWaitTime,
      estimated_times: estimatedTimes,
      operating_user_estimated_time: operatingUserEstimatedTime,
      operated_at: operatedAt, // Timestamp of the user being operated
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
