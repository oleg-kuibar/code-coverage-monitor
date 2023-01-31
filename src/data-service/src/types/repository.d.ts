import {ICoverageHistory} from "./coverage-history";

interface IRepository {
    name: string;
    url: string;
    coverageHistory: ICoverageHistory[];
}

export { IRepository };
