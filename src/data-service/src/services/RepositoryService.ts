import { Request, Response } from 'express';
import { GitHubStrategy } from "../strategies/repositories/GitHubStrategy";
import axios from "axios";
import parseRepositoryURL from "../utils/string-parser";
import { GitHubRepositoryContent, RepoProvider, RepositoryFetchingStrategy } from "../models/repository";

type ProviderStrategyMap = { [key in RepoProvider]: GitHubStrategy }    ;
const ProviderStrategyMap: ProviderStrategyMap = {
    github: new GitHubStrategy(),
}

// TODO: Implement both public and private repository cloning; for now, only public repositories are supported
export class RepositoryService {
    async getUserRepositories(username: string, provider?: string, url?: string): Promise<{
        success: boolean;
        message?: string;
        data?: string[];
    }> {
        if (!username) {
            return {
                success: false,
                message: 'Username is required',
            }
        }

        if (!provider && !url) {
            return {
                success: false,
                message: 'Provider or URL is required',
            };
        }

        let strategy: RepositoryFetchingStrategy;

        if (provider) {
            strategy = this.getStrategy(provider);
        }

        if (!provider && url) {
            const repoMetadata = parseRepositoryURL(url);
            if (!repoMetadata) {
                const providers = process.env.SUPPORTED_PROVIDERS || 'github';

                return {
                    success: false,
                    message: `Repository URL is invalid or provider is not supported. Supported providers: ${providers}`,
                };
            }
            strategy = this.getStrategy(repoMetadata.provider);
        }

        // @ts-ignore; FIXME: This is a hack to get around the fact that the type of strategy is not known at compile time
        const repoList = await strategy.getPublicRepositoriesByUserId(username);

        return {
            success: true,
            data: repoList,
        }
    }

    async cloneRepository(req: Request, res: Response): Promise<void> {
        const repositoryUrl = req.params.url as string;

        // Extract owner and repository name from the GitHub URL
        const repoMetadata = parseRepositoryURL(repositoryUrl);

        if (!repoMetadata) {
            const providers = process.env.SUPPORTED_PROVIDERS || 'github';
            res.status(400).send(`Repository URL is invalid or provider is not supported. Supported providers: ${providers}`);
            return;
        }
        // TODO: Implement both public and private repository validation; for now, only public repositories are supported
        const { valid, message } = await this.validateRepository(repoMetadata);

        if (!valid) {
            res.status(400).send(message);
            return;
        }
    }

    private async validateRepository(repoMetadata: Record<string, any>): Promise<{
        valid: boolean;
        message: string | null;
    }> {
        try {
            const { owner, repo, provider } = repoMetadata;

            const strategy = this.getStrategy(provider);
            // Get repository information from the Provider API (GitHub, GitLab, etc.) using the appropriate strategy
            const response = await strategy.getPublicRepositoryInfo(owner, repo);

            // Check if the repository is a JavaScript/TypeScript repository
            const language = response.language;
            if (language !== 'JavaScript' && language !== 'TypeScript') {
                return {
                    valid: false,
                    message: 'Repository is not a JavaScript/TypeScript repository.',
                }
            }

            // Get the contents of the repository
            const contentsResponse = await axios.get<GitHubRepositoryContent[]>(`https://api.github.com/repos/${owner}/${repo}/contents`);

            // Check if package.json is present in the repository
            const hasPackageJson = contentsResponse.data.some((file: any) => file.name === 'package.json');
            if (!hasPackageJson) {
                return {
                    valid: false,
                    message: 'Repository does not contain a package.json file.',
                }
            }

            // Check if package-lock.json is present in the repository
            const hasPackageLockJson = contentsResponse.data.some((file: any) => file.name === 'package-lock.json');
            if (!hasPackageLockJson) {
                return {
                    valid: false,
                    message: 'Repository does not contain a package-lock.json file.',
                }
            }

            // Check if npm is used as the package manager
            const packageJsonResponse = await axios.get(
                `https://api.github.com/repos/${owner}/${repo}/contents/package.json`
            );
            const packageJson = JSON.parse(Buffer.from(packageJsonResponse.data.content, 'base64').toString());
            const hasNpmScript = packageJson.scripts && (packageJson.scripts.start || packageJson.scripts.dev);
            if (!hasNpmScript) {
                return {
                    valid: false,
                    message: 'Repository does not use npm as the package manager or does not have npm start script.',
                }
            }

            // Repository passes all validations
            return {
                valid: true,
                message: null,
            }
        } catch (error) {
            console.error('Error validating repository:', error);
            return {
                valid: false,
                message: 'Failed to validate repository.',
            }
        }
    }

    private getStrategy(provider: RepoProvider): RepositoryFetchingStrategy {
        const Strategy = ProviderStrategyMap[provider];
        if (!Strategy) {
            throw new Error(`Provider ${provider} is not supported.`);
        }
        return Strategy;
    }
}
