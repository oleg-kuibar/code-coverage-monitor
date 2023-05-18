import NYC from "nyc";
import {resolve} from "path";

// Configure and initialize nyc
const coverage = new NYC({
  cwd: resolve(__dirname, '..'), // Set the current working directory
  reporter: ['text', 'html'], // Specify the reporters to use
});
coverage.reset(); // Reset any existing coverage information
coverage.wrap(); // Wrap the test runner with coverage tracking

// Run the tests using Mocha
require('mocha/bin/mocha')(['test/**/*.js'], () => {
  coverage.writeCoverageFile(); // Write the coverage report
  coverage.report(); // Generate the coverage report
});
