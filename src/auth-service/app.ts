import express = require("express");
import bodyParser = require("body-parser");
import passport = require("passport");
import cookieParser = require("cookie-parser");
import dotenv = require('dotenv');
import process = require('process');

import mongoose from "mongoose";
import helmet from "helmet";

dotenv.config();

const app = express();
export default app;

// Connect to the MongoDB
mongoose.connect(process.env.MONGO_URL as string, {},
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to MongoDB');
        }
    }
);

// Use helmet to set security-related HTTP headers
app.use(helmet());

// Parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use cookie-parser to par
app.use(cookieParser());
// Initialize Passport
app.use(passport.initialize());
// Import routes
import authRoutes from "./src/routes/auth";
import userRoutes from "./src/routes/user";

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
