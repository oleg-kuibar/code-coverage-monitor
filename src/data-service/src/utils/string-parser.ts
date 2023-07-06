import { RepoProvider } from "../models/repository";
import * as process from "process";

export default function parseRepositoryURL(url: string): { owner: string, repo: string, provider: RepoProvider } | null {
    const provider = process.env.SUPPORTED_PROVIDERS || 'github'
    const regex = new RegExp(`^(?:https?:\/\/)?(?:www\.)?(${provider})\.(?:com|org)\/([^/]+)\/([^/]+)`);
    const match = url.match(regex);

    if (match) {
        const [, provider, owner, repo] = match;
        return { provider, owner, repo };
    }

    return null;
}
