import { Schema, model } from 'mongoose';

const CoverageDataSchema = new Schema({
    lines: {
        type: Number,
        required: true
    },
    branches: {
        type: Number,
        required: true
    },
    functions: {
        type: Number,
        required: true
    },
    statements: {
        type: Number,
        required: true
    },
});

const ContributionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    linesAdded: {
        type: Number,
        required: true
    },
    linesRemoved: {
        type: Number,
        required: true
    },
});

const CoverageHistorySchema = new Schema({
    projectName: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    commit: {
        type: String,
        required: true
    },
    buildNumber: {
        type: Number,
        required: true
    },
    coverageData: {
        type: Map,
        of: CoverageDataSchema
    },
    contributors: [ContributionSchema]
});

export default model('CoverageHistory', CoverageHistorySchema);
