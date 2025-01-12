import { Request, Response } from "express";
import { predict } from "../helpers/ml-loader";

// Define independentData columns (you should replace this with the actual columns used in your model)
const independentDataColumns = [
    "category",
    "specialization",
    "patient_sex",
    "doctor_sex",
    "schedule_day",
    "schedule_start_time",
    "schedule_end_time",
    "patient_age",
    "doctor_age",
];

export const predictOperationTime = async (req: Request, res: Response) => {
    try {
        const inputData = req.body;

        // Ensure input columns match training data
        const missingColumns = independentDataColumns.filter(
            (col) => !(col in inputData)
        );
        missingColumns.forEach((col) => (inputData[col] = null));

        const prediction = await predict(inputData);

        return res.status(200).json(prediction);
    } catch (error) {
        console.error("Error making prediction:", error);
        return res
            .status(500)
            .json({ message: "Error making prediction", error });
    }
};
