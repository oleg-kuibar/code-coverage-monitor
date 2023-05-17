import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {IUser, User} from '../models/user';
import * as passport from "passport";
import * as process from "process";

export class AuthService {
  register = async (req: Request, res: Response): Promise<void> => {
    const { email, password, name } = req.body;

    try {
      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser: IUser = new User({
        email,
        password: hashedPassword,
        name,
      });

      // Save the user in MongoDB
      const savedUser = await newUser.save();

      // Generate JWT token
      const token = jwt.sign({ id: savedUser._id }, 'YOUR_JWT_SECRET', {
        expiresIn: '1d',
      });

      // Return the token to the client
      res.status(201).json({ token });
    } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ message: 'Registration failed' });
    }
  }

  login = async (req: Request, res: Response): Promise<void>  => {
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, 'YOUR_JWT_SECRET', {
        expiresIn: '1d',
      });

      // Return the token and user details to the client
      res.json({ user, token });
    } catch (error) {
      console.error('Error during user login:', error);
      res.status(500).json({ message: 'Login failed' });
    }
  }

  logout = async (req: Request, res: Response): Promise<void>  => {
    req.logout({ keepSessionInfo: false }, (err: Error | null) => {
      if (err) {
        // Handle any error that occurred during logout
        res.status(500).json({ message: 'Logout failed' });
        return;
      }

      res.status(200).json({ message: 'Logout successful' });
    });
  }

  authenticateWithGitHub = (req: Request, res: Response) => {
    // Perform GitHub authentication using Passport-GitHub strategy
    // This method will redirect the user to the GitHub authentication page
    // Passport-GitHub will handle the authentication process and invoke the callback method
    // Refer to the Passport-GitHub documentation for the specific implementation details
    // Handle the GitHub authentication callback
    passport.authenticate('github', { session: false }, async (err, user): Promise<void> => {
      try {
        if (err || !user) {
          // Handle authentication failure
          res.status(401).json({ message: 'Authentication failed' });
          return;
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
          expiresIn: '1d',
        });

        // Redirect the user or send a response with the token
        res.redirect(`/callback?token=${token}`);
      } catch (error) {
        console.error('Error during GitHub authentication callback:', error);
        res.status(500).json({ message: 'Authentication failed' });
      }
    })(req, res);
  }

  handleGitHubCallback = async (req: Request, res: Response) => {
    // Get the user profile data from the GitHub authentication
    const { id, username, email } = req.user as Record<string, { username: string }>; // Assumes you have configured Passport-GitHub properly
 
    try {
      // Check if a user with the same GitHub ID already exists
      let user = await User.findOne({ githubId: id });

      if (!user) {
        // Create a new user if the GitHub ID is not found
        user = new User({
          githubId: id,
          email,
          name: username,
        });
      }

      // Save the user in MongoDB
      await user.save();

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, 'YOUR_JWT_SECRET', {
        expiresIn: '1d',
      });

      // Redirect the user or send a response with the token
      res.redirect(`/callback?token=${token}`);
    } catch (error) {
      console.error('Error during GitHub authentication callback:', error);
      res.status(500).json({ message: 'Authentication failed' });
    }
  }
}
