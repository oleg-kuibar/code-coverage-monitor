import express, { Request, Response } from "express";
import { RepositoryModel } from "../models/repository.schema"

const router = express.Router();

// Get all repositories
router.get("/", async (_, res: Response) => {
    const repositories = await RepositoryModel.find({});
    res.send(repositories);
});

// Get a specific repository by its ID
router.get("/:id", async (req, res) => {
    try {
        const repository = await RepositoryModel.findById(req.params.id);
        if (!repository) {
            return res.status(404).send("Repository not found");
        }
        res.send(repository);
        return res.status(200);

    } catch (err) {
        console.error(err);
        return res.status(500).send("Error fetching repository");
    }
});

// Add a new repository
router.post("/", async (req: Request, res: Response) => {
    const repository = await RepositoryModel.create({
        name: req.body.name,
        description: req.body.description,
        coverageHistory: req.body.coverageHistory
    });
    await repository.save();
    res.send(repository);
});

// Update an existing repository
router.put("/:id", async (req: Request, res: Response) => {
    const repository = await RepositoryModel.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            coverageHistory: req.body.coverageHistory
        },
        { new: true }
    );
    if (!repository) {
        return res.status(404).send("Repository not found");
    }
    res.send(repository);
    return;
});

// Delete a repository
router.delete("/:id", async (req: Request, res: Response) => {
    const repository = await RepositoryModel.findByIdAndRemove(req.params.id);
    if (!repository) {
        return res.status(404).send("Repository not found");
    }
    res.send(repository);
    return;
});

export { router as repositoryRoutes };
