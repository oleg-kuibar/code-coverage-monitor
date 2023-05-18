import { Router } from "express";
import {RepositoryService} from "../services/RepositoryService";

const repositoryService = new RepositoryService();
const repositoryRoute = Router();

repositoryRoute.get('/repositories', repositoryService.getUserRepositories);
repositoryRoute.get('/:userId/repositories', repositoryService.getUserRepositoriesById);

export default repositoryRoute;
