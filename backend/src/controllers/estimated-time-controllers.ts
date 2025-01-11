import express from "express";
import { estimatedTimeModel } from "../models/estimated-time.model";
// import { queueModel } from "../models/queue.model";
import mongoose from "mongoose";

// Controller function to create or update estimated time
export const updateOrCreateEstimatedTime = async (
  req: express.Request, 
  res: express.Response
) => {
  const { category, queue_id, time } = req.body;

  try {
    // Check if a record already exists with the same queue_id and category
    let previous = await estimatedTimeModel.findOne({ queue_id, category });

    if (previous) {
      // Record exists, update the record
      const updatedTime = (previous.average_time * previous.count + time) / (previous.count + 1);
      previous.average_time = updatedTime;  // Update the operating time
      previous.count += 1;  // Increment the count by 1

      // Save the updated record
      await previous.save();
      console.log("Updated existing estimated time.");
      return res.status(200).json(previous);
    } else {
      // Record does not exist, create a new record
      const newEstimatedTime = new estimatedTimeModel({
        category,
        queue_id,
        time,
        count: 1  // Initialize count as 1
      });

      // Save the new record
      await newEstimatedTime.save();
      console.log("Created new estimated time.");
      return res.status(201).json(newEstimatedTime);
    }
  } catch (error) {
    console.error("Error updating or creating estimated time:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getEstimatedTimeFor = async (req, res) => {
  const { category, queue_id } = req.body;

  try {
    // Validate required fields
    if (!category || !queue_id) {
      return res.status(400).json({
        success: false,
        message: "Both 'category' and 'queue_id' are required.",
      });
    }

    // Fetch the estimated time from the database
    const estimatedTime = await estimatedTimeModel.findOne({
      category,
      queue_id,
    });

    // Check if the record exists
    if (!estimatedTime) {
      return res.status(404).json({
        success: false,
        message: "No estimated time found for the given category and queue_id.",
      });
    }

    // Respond with the fetched data
    return res.status(200).json({
      success: true,
      data: estimatedTime,
    });
  } catch (error) {
    // Handle any errors during the query
    console.error("Error fetching estimated time:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the estimated time.",
    });
  }
};
