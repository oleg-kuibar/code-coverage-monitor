export interface RepositoryFetchingStrategy {
  getUserRepositories(accessToken: string): Promise<string[]>;
  getUserRepositoriesById(accessToken: string, id: string): Promise<string[]>;
}
