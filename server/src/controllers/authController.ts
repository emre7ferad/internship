import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from "../models/User";
import { UnauthorizedError, ValidationError } from "../utils/errorHandler";

export const login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw new ValidationError('Username and password are required');
      }

      const user = await User.findOne({ username });
      if (!user) {
        throw new UnauthorizedError('Invalid username or password');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedError('Invalid username or password');
      }

      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured');
      }

      const token = jwt.sign(
          { 
            userId: user._id,
            username: user.username,
            isAdmin: user.isAdmin,
            role: user.role || (user.isAdmin ? 'admin' : 'user')
          },
          process.env.JWT_SECRET as string,
          { expiresIn: '1h' }
      );
      res.json({ token, user: {id: user._id, username: user.username, isAdmin: user.isAdmin} });
  } catch (error) {
    console.error('Login error: ', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: "Успешен изход" 
    });
  } catch (error) {
    console.error('Logout error: ', error);
    res.status(500).json({
      success: false,
      error: "Грешка при изход"
    });
  }
};