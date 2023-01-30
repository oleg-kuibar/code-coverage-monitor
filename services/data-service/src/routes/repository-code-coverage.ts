// Get a single repository coverage history
import express, {Request, Response} from "express";
import CoverageHistorySchema from "../models/coverage-history.schema";
import { Error } from 'mongoose';
import {ICoverageHistory} from "../types/coverage-history";

const router = express.Router();

router.get("/:id/coverage-history/:historyId", (req: Request, res: Response) => {
    const repositoryId = req.params.repositoryId;
    const historyId = req.params.historyId;
    CoverageHistorySchema.findOne({ repositoryId, _id: historyId }, (err: Error, coverageHistory: ICoverageHistory) => {
        if (err) return res.status(500).send(err);
        if (!coverageHistory) return res.status(404).send("Coverage history not found");
        return res.send(coverageHistory);
    });
});

// Add a new repository coverage history
router.post("/:id/coverage-history", (req: Request, res: Response) => {
    const repositoryId = req.params.repositoryId;
    const coverageHistory = new CoverageHistorySchema({
        repositoryId,
        ...req.body,
    });
    coverageHistory.save((err, newCoverageHistory) => {
        if (err) return res.status(500).send(err);
        return res.send(newCoverageHistory);
    });
});

// Update a repository coverage history
router.put("/:id/coverage-history/:historyId", (req: Request, res: Response) => {
    const repositoryId = req.params.repositoryId;
    const historyId = req.params.historyId;
    CoverageHistorySchema.findOneAndUpdate({ repositoryId, _id: historyId }, req.body, { new: true }, (err, updatedCoverageHistory) => {
        if (err) return res.status(500).send(err);
        if (!updatedCoverageHistory) return res.status(404).send("Coverage history not found");
        return res.send(updatedCoverageHistory);
    });
});

// Delete a repository coverage history
router.delete("/:id/coverage-history/:historyId", (req: Request, res: Response) => {
    const repositoryId = req.params.repositoryId;
    const historyId = req.params.historyId;
    CoverageHistorySchema.findOneAndDelete({ repositoryId, _id: historyId }, (err: Error, deletedCoverageHistory: ICoverageHistory) => {
        if (err) return res.status(500).send(err);
        if (!deletedCoverageHistory) return res.status(404).send("Coverage history not found");
        return res.send(deletedCoverageHistory);
    });
});

export { router as repositoryCodeCoverageRoutes }
