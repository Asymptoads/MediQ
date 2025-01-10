import express from "express";
import { userModel } from "../models/user.model";
import mongoose from "mongoose";

// Get all users both doctor and user
export const getAllUsers = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const users = await userModel.find({});
        // .select('-authentication -password');
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching users" });
    }
};

export const getAllDoctors = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const doctors = await userModel.find({ is_doctor: true }); // Filter users who are doctors
        // .select('-authentication -password');  // Uncomment this if you want to exclude sensitive fields
        return res.status(200).json(doctors);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching doctors" });
    }
};

export const getAllPatients = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const doctors = await userModel.find({ is_doctor: false });
        // .select('-authentication -password');  // Uncomment this if you want to exclude sensitive fields
        return res.status(200).json(doctors);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching doctors" });
    }
};

// Get current user
export const getCurrentUser = async (
    req: any, // Using any for req to access user property
    res: express.Response
) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res
                .status(401)
                .json({ message: "User ID not found in request" });
        }

        const user = await userModel.findById(userId);
        // .select('-authentication -password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error fetching user" });
    }
};

export const updateUser = async (
    req: any, // Using any for req to access user property
    res: express.Response
) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res
                .status(401)
                .json({ message: "User ID not found in request" });
        }

        const { name, email, phone_number, date_of_birth, specialization } =
            req.body;

        // Validate email if it's being updated
        if (email) {
            const existingUser = await userModel.findOne({
                email,
                _id: { $ne: userId },
            });

            if (existingUser) {
                return res
                    .status(400)
                    .json({ message: "Email already in use" });
            }
        }

        // First get the current user to check if they're a doctor
        const currentUser = await userModel.findById(userId);

        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {
                $set: {
                    ...(name && { name }),
                    ...(email && { email }),
                    ...(phone_number && { phone_number }),
                    ...(date_of_birth && {
                        date_of_birth: new Date(date_of_birth),
                    }),
                },
            },
            {
                new: true,
                // select: '-authentication -password'
            }
        );
        const validSpecializations = (userModel.schema as any).paths
            .specialization.enumValues;

        // Add validation before the update
        if (specialization && !validSpecializations.includes(specialization)) {
            return res.status(400).json({
                message: `Invalid specialization. Must be one of: ${validSpecializations.join(
                    ", "
                )}`,
            });
        }
        const updatedDoctor = await userModel.findByIdAndUpdate(
            userId,
            {
                $set: {
                    ...(name && { name }),
                    ...(email && { email }),
                    ...(phone_number && { phone_number }),
                    ...(date_of_birth && {
                        date_of_birth: new Date(date_of_birth),
                    }),
                    ...(specialization && { specialization }),
                },
            },
            {
                new: true,
                // select: '-authentication -password'
            }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return appropriate response based on user type
        return res.status(200).json({
            message: "User updated successfully",
            user: currentUser.is_doctor ? updatedDoctor : updatedUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error updating user" });
    }
};

// Delete user
export const deleteUser = async (
    req: any, // Using any for req to access user property
    res: express.Response
) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res
                .status(401)
                .json({ message: "User ID not found in request" });
        }

        const deletedUser = await userModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Clear authentication cookie
        res.clearCookie("jwt_token", {
            domain: "localhost",
            path: "/",
        });

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error deleting user" });
    }
};

export const validateObjectId = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ObjectId format" });
    }
    next();
};

export const getDoctorById = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const doctorId = req.params.id;

        // Validate if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res
                .status(400)
                .json({ message: "Invalid doctor ID format" });
        }

        // Fetch doctor by ID and ensure they are marked as a doctor
        const doctor = await userModel.findOne({
            _id: doctorId,
            is_doctor: true,
        });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        return res.status(200).json(doctor);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching doctor by ID" });
    }
};

export const getPatientById = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const patientId = req.params.id;

        // Validate if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(patientId)) {
            return res
                .status(400)
                .json({ message: "Invalid patient ID format" });
        }

        // Fetch patient by ID and ensure they are not marked as a doctor
        const patient = await userModel.findOne({
            _id: patientId,
            is_doctor: false,
        });

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Optionally exclude sensitive fields
        // .select('-authentication -password');

        return res.status(200).json(patient);
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Error fetching patient by ID" });
    }
};

// Update is_busy Controller
export const updateIsBusy = async ( req: express.Request, res: express.Response) => {
  const { doctor_id } = req.params; // ID of the user to update
  const { is_busy } = req.body; // New value for is_busy

  try {
    // Validate input
    if (typeof is_busy !== 'boolean') {
      return res.status(400).json({ error: 'Invalid value for is_busy. Must be a boolean.' });
    }

    console.log(doctor_id)
    // Find user and update is_busy
    userModel.findById(doctor_id)
    const user = await userModel.findByIdAndUpdate(
      doctor_id,
      { is_busy },
      { new: false, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ message: 'is_busy updated successfully.', user });
  } catch (error) {
    console.error('Error updating is_busy:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
