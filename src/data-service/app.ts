import express = require("express");
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import dotenv = require('dotenv');
import process = require('process');
import {merge} from "lodash";

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

// Verify the token

// Import routes
import verifyJwt from "./src/middleware/jwt.middleware";
import repositoryRoute from "./src/routes/repository";
import codeCoverageRoute from "./src/routes/coverage";

import { serve, setup } from "swagger-ui-express";

import specs from "./swagger";
// Add middleware to serve the Swagger UI
app.use('/api-docs', serve, setup(specs));

// Use routes
// public routes
// protected routes
app.use("/repositories", verifyJwt, merge(repositoryRoute, codeCoverageRoute));
