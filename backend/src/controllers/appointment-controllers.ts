import express from "express";
import mongoose from "mongoose";
import { appointmentModel } from "../models/appointment.model";
import { queueModel } from "../models/queue.model";
import { userModel } from "../models/user.model";
import { estimatedTimeModel } from "../models/estimated-time.model";

export const createAppointment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId, specialization, category, schedule_id } = req.body;

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
      schedule: {
        day: validSchedule.day,
        start_time: validSchedule.start_time,
        end_time: validSchedule.end_time
      },
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
export const getAppointmentsBySpecialization = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { specialization, schedule_id } = req.params;

    // Validate the schedule_id as a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(schedule_id)) {
      return res.status(400).json({ message: "Invalid schedule ID format" });
    }

    // Find the queue based on the specialization
    const queue = await queueModel.findOne({ specialization }).populate({
      path: "weekly_schedule.doctors",
      model: "user",
    });
    if (!queue) {
      return res.status(404).json({ message: "Queue not found" });
    }

    // Filter the weekly_schedule to include only the one with the matching schedule_id
    const filteredSchedule = queue.weekly_schedule.filter(
      (entry) => entry._id.toString() === schedule_id
    );

    if (filteredSchedule.length === 0) {
      return res.status(400).json({ message: "Invalid schedule for the selected queue" });
    }

    // Fetch appointments by the given schedule_id that are not completed
    const appointments = await appointmentModel.find({
      queue_id: queue._id,
      // "schedule._id": mongoose.Types.ObjectId(schedule_id),
      is_completed: false,
    }).populate("user_id").lean();

    // Sort appointments by registered_at
    const sortedAppointments = appointments.sort((a, b) => new Date(a.registered_at).getTime() - new Date(b.registered_at).getTime());

    // Split users into suspended and waiting with position numbers
    const suspended = sortedAppointments
      .filter((appt) => appt.is_suspended)
      .map((appt, index) => ({ ...appt.user_id, position_no: index + 1 }));

    const waiting = sortedAppointments
      .filter((appt) => !appt.is_suspended)
      .map((appt, index) => ({ ...appt.user_id, position_no: index + 1 }));

    return res.status(200).json({
      message: "Appointments fetched successfully",
      queue: {
        ...queue.toObject(),
        weekly_schedule: filteredSchedule,
      },
      doctors: filteredSchedule[0].doctors,
      suspended,
      waiting,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
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
      return res.status(200).json([]);
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
