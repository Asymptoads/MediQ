import express from "express";
import { appointmentModel } from "../models/appointment.model";
import { queueModel } from "../models/queue.model";
import mongoose from "mongoose";

// Assign user to a queue based on queue ID
export const createappointment = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { userId, queueId, category } = req.body;

        // Validate if the IDs are valid MongoDB ObjectIds
        if (
            !mongoose.Types.ObjectId.isValid(userId) ||
            !mongoose.Types.ObjectId.isValid(queueId)
        ) {
            return res
                .status(400)
                .json({ message: "Invalid user ID or queue ID format" });
        }

        // Check if the queue exists
        const queue = await queueModel.findById(queueId);
        if (!queue) {
            return res.status(404).json({ message: "Queue not found" });
        }

        // Assign user to the queue
        const appointment = new appointmentModel({
            user_id: userId,
            queue_id: queueId,
            category: category, // Add category here
            // status: "pending",
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
