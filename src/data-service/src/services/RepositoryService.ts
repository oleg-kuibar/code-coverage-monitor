import { Request, Response } from 'express';
import {GitHubStrategy} from "../strategies/repositories/GitHubStrategy";

export class RepositoryService {
  private githubStrategy: GitHubStrategy;
  constructor() {
    this.githubStrategy = new GitHubStrategy();
  }
  
  async getUserRepositories(req: Request, res: Response): Promise<void> {
    const source = req.params.source as 'github' | 'gitlab' | 'bitbucket';
    const accessToken = req.headers.authorization?.split(' ')[1] as string

    switch (source) {
      case 'github':
        res.status(200).json({ repositories: await this.githubStrategy.getUserRepositories(accessToken) });
        break;
      default:
        res.status(400).send('Invalid source.');
    }
  }

  async getUserRepositoriesById(req: Request, res: Response): Promise<void> {
    const source = req.params.source as 'github';
    const accessToken = req.headers.authorization?.split(' ')[1] as string
    const id = req.params.userId as string

    switch (source) {
      case 'github':
        res.status(200).json({ repositories: await this.githubStrategy.getUserRepositoriesById(accessToken, id) });
        break;
      default:
        res.status(400).send('Invalid source.');
    }
  }
}