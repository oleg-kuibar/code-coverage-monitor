import mongoose, { Schema} from 'mongoose';
import CoverageHistory from './coverage-history.schema';
import {IRepository} from "../types/repository";
import { ICoverageHistory } from '../types/coverage-history';

const RepositorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true
    },
    coverageHistory: [CoverageHistory.schema]
});

export class Repository extends mongoose.Document implements IRepository {
    name: string;
    url: string;
    coverageHistory: ICoverageHistory[];

    constructor(name: string, url: string, coverageHistory: ICoverageHistory[]) {
        super();
        this.name = name;
        this.url = url;
        this.coverageHistory = coverageHistory;
    }
}

export const RepositoryModel = mongoose.model<Repository>('Repository', RepositorySchema);
