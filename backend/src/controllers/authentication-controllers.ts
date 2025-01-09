import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { secret, token_expire, jwt_token_expire } from '../envconfig';
import { authentication, random } from '../helpers/authentication-helpers';
import { userModel } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid'; // For generating _id

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
        .json({ message: 'Email and Password required!' })
        .end();
    }

    const user = await userModel
      .findOne({ email })
      .select('+authentication.salt +authentication.password');

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Account does not exist!' })
        .end();
    }

    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectedHash) {
      return res
        .status(403)
        .json({ message: 'Wrong email or password!' })
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
      domain: 'localhost',
      path: '/',
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
      date_of_birth: user.date_of_birth
    };

    return res
      .status(200)
      .cookie('jwt_token', jwt_token, options)
      .json({
        message: 'Logged in successfully!',
        jwt_token,
        currentUser,
        success: true,
      })
      .end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong!' }).end();
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { name, email, password, phone_number, date_of_birth } = req.body;

    if (!email || !password || !name || !phone_number || !date_of_birth) {
      return res
        .status(400)
        .json({ message: 'All fields are required!' });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    const salt = random();
    const _id = uuidv4(); // Generate unique ID

    const user = await userModel.create({
      _id,
      email,
      name,
      phone_number,
      date_of_birth: new Date(date_of_birth),
      password, // Store the plain password in the main password field
      authentication: {
        salt,
        password: authentication(salt, password), // Store the hashed password in authentication
      },
    });

    const createdUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      date_of_birth: user.date_of_birth
    };

    return res
      .status(200)
      .json({ message: 'Registered Successfully', createdUser })
      .end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong!' }).end();
  }
};
