import User from '../models/user';
import bcrypt = require('bcrypt');
import jwt = require('jsonwebtoken');
import process = require('process');
import {Request, Response} from "express";
import {ILogin, IRegister} from "../types/auth";

const JWT_SECRET: string = process.env.JWT_SECRET as string;

export class AuthService {
    async register({email, password, name}: IRegister): Promise<{ token: string }> {
        const user = await User.findOne({email});
        if (user) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name, email, password: hashedPassword});
        await newUser.save();
        const token = jwt.sign({id: newUser._id}, JWT_SECRET, {
            expiresIn: '1d'
        });
        return {token};
    }

    async login({email, password}: ILogin) {
        const user = await User.findOne({email});
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '1d'});
        return {user, token};
    }

    async logout(req: Request, res: Response) {
        req.logout(
            {keepSessionInfo: false},
            () => res.status(200).send({message: "Logout successful."})
        );
    }
}
