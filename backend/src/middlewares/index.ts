// middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { secret } from '../envconfig';
import  {userModel}  from '../models/user.model';

export const isAuthenticated = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies?.jwt_token;
    let token;

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (cookieToken) {
      token = cookieToken;
    }

    if (!token) {
      return res.status(401).json({ message: "Authentication token required" });
    }

    const decoded = jwt.verify(token, secret) as { id: string };

    // Check if the user exists
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = { id: decoded.id }; // Attach user info to the request
    next(); // Call the next middleware
  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware to check if the user is a doctor
export const isDoctor = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "User ID not found in request" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.is_doctor) {
      return res.status(403).json({ message: "Access denied. User is not a doctor." });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error checking if user is a doctor:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Middleware to check if the user is a patient
export const isPatient = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "User ID not found in request" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.is_doctor) {
      return res.status(403).json({ message: "Access denied. Doctors cannot access patient routes." });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error checking if user is a patient:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Middleware to check if the user is an admin
export const isAdmin = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "User ID not found in request" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.is_admin) {
      return res.status(403).json({ message: "Access denied. User is not an admin." });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error checking if user is an admin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
