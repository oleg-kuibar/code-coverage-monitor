import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as mongoose from "mongoose";
import express = require("express");
import helmet from "helmet";
import { merge } from "lodash";

const app = express();

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
import { repositoryRoutes } from "./src/routes/repository";
import { repositoryCodeCoverageRoutes } from "./src/routes/repository-code-coverage";

// Use routes
// public routes
// protected routes
app.use("/repositories", verifyJwt, merge(repositoryRoutes, repositoryCodeCoverageRoutes));
