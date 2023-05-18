import { Request, Response } from 'express';
import { User } from '../models/user';

export class UserService {
  getUserById = async (req: Request, res: Response) => {
    // Implementation of getting a user by ID
    const user = await User.findById({ id: req.params.id });

    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    
    res.status(200).json({ user });
  }
}