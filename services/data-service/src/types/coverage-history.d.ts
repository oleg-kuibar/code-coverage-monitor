interface ICoverageData {
    lines: number;
    branches: number;
    functions: number;
    statements: number;
}

interface IContribution {
    name: string;
    email: string;
    linesAdded: number;
    linesRemoved: number;
}

interface ICoverageHistory {
    projectName: string;
    timestamp: Date;
    branch: string;
    commit: string;
    buildNumber: number;
    coverageData: Map<string, ICoverageData>;
    contributors: IContribution[];
}

export { ICoverageData, IContribution, ICoverageHistory };
