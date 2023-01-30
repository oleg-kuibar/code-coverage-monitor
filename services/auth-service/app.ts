import express = require("express");
import mongoose from "mongoose";
import helmet from "helmet";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import cookieParser from "cookie-parser";

const app = express();

// Connect to the MongoDB
mongoose.connect(process.env.MONGO_URL, {},
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
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/user');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
