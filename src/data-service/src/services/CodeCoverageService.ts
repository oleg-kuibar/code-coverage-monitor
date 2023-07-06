import { exec } from 'child_process';
import { v4 } from 'uuid';
import { pgConnectionPool } from "../db";

export class CodeCoverageService {
  async analyzeCode(repositoryUrl: string): Promise<{
    success: boolean;
    message: string;
    reportPath?: string;
    error?: string;
  }> {
    try {
      // Clone the repository
      const cloneCommand = `git clone ${repositoryUrl}`;
      await exec(cloneCommand);

      // Install dependencies
      const installCommand = 'yarn install';
      await exec(installCommand, { cwd: 'repository-directory' });

      // Run tests with coverage
      const coverageCommand = 'nyc npm run test';
      await exec(coverageCommand, { cwd: 'repository-directory' });

      // Return the code coverage report or relevant information
      return {
        success: true,
        message: 'Code analysis completed',
        reportPath: 'path/to/code/coverage/report',
      };
    } catch (error: Error | any) {
      console.error('Code analysis failed:', error);
      return  {
        success: false,
        message: 'Code analysis failed',
        error: error.message,
      };
    }
  }

  runCoverageTests(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Run the coverage tests using your preferred method
      exec('npx nyc --reporter=lcov npm test', (error, stdout: string) => {
        if (error) {
          console.error('Error executing coverage tests:', error);
          reject(error);
        } else {
          console.log(stdout);
          // this.storeCoverageReport(stdout);
          resolve();
        }
      });
    });
  }

  // store coverage report in database with unique id and by user id
  async storeCoverageReport(testResults: string): Promise<void> {
    // Generate a unique identifier for the test results
    const testId = v4();

    // Save the test results to PostgreSQL
    await pgConnectionPool.none('INSERT INTO test_results(id, results) VALUES($1, $2)', [testId, JSON.stringify(testResults)]);
  }

}
