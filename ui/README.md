# UI Project

This project is a user interface for displaying code coverage information.

## Tech Stack
- Next.js
- Chart.js
- Istanbul (for code coverage analysis)

## Getting Started
1. Clone the repository
``git clone https://github.com/olegkuibar/ui.git``
2. Install dependencies 
``yarn install``
3. Run the development server 
``yarn dev``


## Code Coverage Analysis
Code coverage information can be uploaded as an XML file and will be displayed in the UI using Chart.js. The Istanbul library is used to analyze the code coverage data and extract metrics such as statement coverage, branch coverage, and function coverage.

## Visualization
The code coverage data is visualized using Chart.js, with various charts and graphs to show the coverage information in an easy to understand format.

## Deployment
The UI is deployed locally using Docker. The Dockerfile is located in the root directory of the project. The Dockerfile uses the official Next.js image as a base image and copies the project files into the image. The image is then built and run using Docker Compose.

