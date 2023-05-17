import { Request, Response } from 'express';
import { User } from '../models/user';
import {GitHubStrategy} from "../strategies/repositories/GitHubStrategy";

export class UserService {
  private githubStrategy: GitHubStrategy;
  // private gitlabStrategy: GitLabStrategy;
  // private bitbucketStrategy: BitbucketStrategy;
  constructor() {
    this.githubStrategy = new GitHubStrategy();
  //   this.gitlabStrategy = new GitLabStrategy();
  //   this.bitbucketStrategy = new BitbucketStrategy();
  }

  getUserById = async (req: Request, res: Response) => {
    // Implementation of getting a user by ID
    const user = await User.findById({ id: req.params.id });

    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    
    res.status(200).json({ user });
  }

  async getUserRepositories(req: Request, res: Response): Promise<void> {
    const source = req.params.source as 'github' | 'gitlab' | 'bitbucket';
    const accessToken = req.headers.authorization?.split(' ')[1] as string
    
    switch (source) {
      case 'github':
        res.status(200).json({ repositories: await this.githubStrategy.getUserRepositories(accessToken) });
        break;
      // case 'gitlab':
      //   return this.gitlabStrategy.getUserRepositories(accessToken);
      // case 'bitbucket':
      //   return this.bitbucketStrategy.getUserRepositories(accessToken);
      default:
        res.status(400).send('Invalid source.');
    }
  }
  
  async getUserRepositoriesById(req: Request, res: Response): Promise<void> {
    const source = req.params.source as 'github' | 'gitlab' | 'bitbucket';
    const accessToken = req.headers.authorization?.split(' ')[1] as string
    const id = req.params.id as string
    
    switch (source) {
      case 'github':
        res.status(200).json({ repositories: await this.githubStrategy.getUserRepositoriesById(accessToken, id) });
        break;
      // case 'gitlab':
      //   return this.gitlabStrategy.getUserRepositories(accessToken);
      // case 'bitbucket':
      //   return this.bitbucketStrategy.getUserRepositories(accessToken);
      default:
        res.status(400).send('Invalid source.');
    }
  }
}