import axios from 'axios';
import { GitHubRepositoryContent, GitHubRepositoryInfo, RepositoryFetchingStrategy } from "../../models/repository";

export class GitHubStrategy implements RepositoryFetchingStrategy {

  async getPublicRepositoryInfo(owner: string, repo: string): Promise<GitHubRepositoryInfo> {
    try {
      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch repository information from GitHub API.');
    }
  }

  async getPublicRepositoryContent(owner: string, repo: string): Promise<GitHubRepositoryContent[]> {
    try {
      const response = await axios.get<GitHubRepositoryContent[]>(`https://api.github.com/repos/${owner}/${repo}/contents`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch repository information from GitHub API.');
    }
  }

  async getPublicRepositoriesByUserId(user: string): Promise<string[]> {
    try {
      // Make a request to the GitHub API to get the user's repositories
      const response = await axios.get<GitHubRepositoryInfo[]>(`https://api.github.com/users/${user}/repos`);

      // Extract the repository names from the response
      return response.data.map(repo => repo.name);
    } catch (error) {
      throw new Error('Failed to fetch user repositories from GitHub API.');
    }
  }
}
