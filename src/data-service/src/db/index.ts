// "pg-promise" is a PostgreSQL client for Node.js
import * as process from "process";
import mongoose from "mongoose";

const pgp = require('pg-promise')();

// mongo string: mongodb://<username>:<password>@<host>:<port>/<database>
const mongoURL = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@` +
    `${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
// MongoDB connection
mongoose.connect(mongoURL || '', {
}, (err) => {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
    } else {
        console.log('Connected to MongoDB');
    }
});

// PostgreSQL connection
const pgPool = pgp({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
});

// Export the connections
export const mongoConnection = mongoose;
export const pgConnectionPool = pgPool;
