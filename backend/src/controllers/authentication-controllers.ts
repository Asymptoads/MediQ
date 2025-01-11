import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { secret, token_expire, jwt_token_expire } from "../envconfig";
import { authentication, random } from "../helpers/authentication-helpers";
import { userModel } from "../models/user.model";
// import { v4 as uuidv4 } from 'uuid'; // For generating _id

// Helper function to get user by email
const getUserByEmail = async (email: string) => {
    return await userModel.findOne({ email });
};

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and Password required!" })
                .end();
        }
        const user = await userModel
            .findOne({ email })
            .select("+authentication.salt +authentication.hashed_password");

        if (!user) {
            return res
                .status(400)
                .json({ message: "Account does not exist!" })
                .end();
        }

        const expectedHash = authentication(user.authentication.salt, password);
        if (user.authentication.hashed_password !== expectedHash) {
            return res
                .status(403)
                .json({ message: "Wrong email or password!" })
                .end();
        }

        const jwt_token = jwt.sign(
            {
                id: user._id,
            },
            secret,
            { expiresIn: jwt_token_expire }
        );

        const options = {
            domain: "localhost",
            path: "/",
            httpOnly: true,
            maxAge: parseInt(token_expire),
        };

        user.authentication.sessionToken = jwt_token;
        await user.save();

        const currentUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            date_of_birth: user.date_of_birth,
        };

        return res
            .status(200)
            .cookie("jwt_token", jwt_token, options)
            .json({
                message: "Logged in successfully!",
                jwt_token,
                currentUser,
                success: true,
            })
            .end();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Something went wrong!" }).end();
    }
};

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const {
            name,
            email,
            password,
            date_of_birth,
            phone_number,
            is_doctor,
            specialization,
            is_busy,
        } = req.body;

        console.log("Request body:", req.body);

        if (!name || !email || !password || !date_of_birth || !phone_number) {
            console.error("Missing fields in request body!");
            return res
                .status(400)
                .json({ message: "All fields are required!" });
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            console.error("User already exists with email:", email);
            return res.status(400).json({ message: "User already exists!" });
        }

        const salt = String(random());
        const hashedPassword = authentication(salt, password);

        // Handle doctor registration
        if (is_doctor) {
            if (!specialization) {
                return res.status(400).json({
                    message: "Specialization is required for doctors!",
                });
            }
        }

        // Create new user document
        const user = await userModel.create({
            email,
            name,
            phone_number,
            date_of_birth: new Date(date_of_birth),
            password, // Store the plain password in the main password field
            authentication: {
                salt,
                hashed_password: hashedPassword, // Store only the hashed password
            },
            is_doctor,
            specialization: is_doctor ? specialization : undefined, // Store specialization if doctor
        });

        const createdUser = {
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            date_of_birth: user.date_of_birth,
            is_doctor: user.is_doctor,
            specialization: user.is_doctor ? user.specialization : undefined, // Include specialization if doctor
            is_bus: user.is_doctor ? user.is_busy : undefined, 
        };

        return res
            .status(200)
            .json({ message: "Registered Successfully", createdUser })
            .end();
    } catch (error) {
        console.error("Error during registration:\n", error);
        return res.status(400).json({ message: "Something went wrong!" }).end();
    }
};

export const logout = async (req: express.Request, res: express.Response) => {
    try {
        // Get the JWT token from cookies
        const token = req.cookies.jwt_token;

        if (!token) {
            return res
                .status(400)
                .json({ message: "No active session found!" })
                .end();
        }

        // Find user by session token and clear it
        const user = await userModel.findOne({
            "authentication.sessionToken": token,
        });

        if (user) {
            // Clear the session token in database
            user.authentication.sessionToken = "";
            await user.save();
        }

        // Clear the cookie
        const options = {
            domain: "localhost",
            path: "/",
            httpOnly: true,
        };

        return res
            .status(200)
            .clearCookie("jwt_token", options)
            .json({ message: "Logged out successfully!" })
            .end();
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(400).json({ message: "Something went wrong!" }).end();
    }
};
