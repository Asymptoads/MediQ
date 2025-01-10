import express from 'express';
import  {userModel}  from '../models/user.model';

// Get all users
export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await userModel
      .find({})
      // .select('-authentication -password');
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error fetching users' });
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
      return res.status(401).json({ message: 'User ID not found in request' });
    }

    const user = await userModel
      .findById(userId)
      .select('-authentication -password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error fetching user' });
  }
};

// Update user
export const updateUser = async (
  req: any, // Using any for req to access user property
  res: express.Response
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'User ID not found in request' });
    }

    const { name, email, phone_number, date_of_birth } = req.body;

    // Validate email if it's being updated
    if (email) {
      const existingUser = await userModel.findOne({ 
        email, 
        _id: { $ne: userId } 
      });
      
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...(name && { name }),
          ...(email && { email }),
          ...(phone_number && { phone_number }),
          ...(date_of_birth && { date_of_birth: new Date(date_of_birth) })
        }
      },
      { 
        new: true,
        select: '-authentication -password'
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error updating user' });
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
      return res.status(401).json({ message: 'User ID not found in request' });
    }

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Clear authentication cookie
    res.clearCookie('jwt_token', {
      domain: 'localhost',
      path: '/'
    });

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error deleting user' });
  }
};
