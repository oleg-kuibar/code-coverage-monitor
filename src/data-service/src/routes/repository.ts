import { Router } from "express";
import {RepositoryService} from "../services/RepositoryService";

const repositoryService = new RepositoryService();
const repositoryRoute = Router();

/**
 * @swagger
 * /api/repositories:
 *   get:
 *     summary: Get user repositories
 *     tags:
 *       - Repositories
 *     description: Retrieve repositories for a user based on username, provider, and URL.
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username of the user.
 *       - in: query
 *         name: provider
 *         schema:
 *           type: string
 *         required: true
 *         description: The repository provider.
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *         required: false
 *         description: The URL for the user's repository.
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
repositoryRoute.get('/repositories', async (req, res) => {
    const username = req.query.username as string;
    const provider = req?.query?.provider as string;
    const url = req?.query?.url as string;

    try {
        const result = await repositoryService.getUserRepositories(username, provider, url);
        const { success, message, data } = result;

        if (!success) {
            return res.status(400).json({
                success,
                message,
            });
        }

        return res.status(200).json({
            success,
            message,
            data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: 'Internal server error'
        });
    }
});

export default repositoryRoute;
