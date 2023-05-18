import axios from 'axios';
import {RepositoryFetchingStrategy} from "../../models/repository";

export class GitHubStrategy implements RepositoryFetchingStrategy {
  async getUserRepositories(accessToken: string): Promise<string[]> {
    try {
      // Make a request to the GitHub API to get the user's repositories
      const response = await axios.get('https://api.github.com/user/repos', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Extract the repository names from the response
      return response.data.map((repo: { name: string }) => repo.name);
    } catch (error) {
      throw new Error('Failed to fetch user repositories from GitHub API.');
    }
  }
  
  async getUserRepositoriesById(accessToken: string, id: string): Promise<string[]> {
    try {
      const response = await axios.get(`https://api.github.com/users/${id}/repos`, {  
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      
      return response.data.map((repo: { name: string }) => repo.name);
    } catch (error) {
      throw new Error('Failed to fetch user repositories from GitHub API.');
    }
  }
}