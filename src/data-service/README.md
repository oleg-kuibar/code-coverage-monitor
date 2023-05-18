# Data Service

The Data Service is a microservice responsible for serving data to the front-end and managing code coverage history. It interacts with the MongoDB database to store and retrieve code coverage information for different projects.

## Getting Started

To set up and run the Data Service, follow the instructions below.

### Prerequisites

- [Node.js 16+](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository: `git clone https://github.com/olegkuibar/code-coverage-monitor.git`
2. Navigate to the root of the project: `cd code-coverage-monitor`
3. Install the dependencies for the Data Service: `cd services/data-service && yarn install` (or `npm install`)

### Configuration

1. Ensure that MongoDB is running locally.
2. Create a database named `data-service` and a collection named `coverageHistory` in MongoDB.

### Starting the Data Service

1. Go to the root of the project: `cd code-coverage-monitor`
2. Start the Data Service: `cd services/data-service && yarn start` (or `npm start`)

## API Endpoints

The Data Service provides the following API endpoints for managing code coverage history:

- `GET /coverage/history`: Retrieves the code coverage history for all projects.
- `POST /coverage/history`: Adds a new code coverage entry to the history for a specific project.
- `GET /coverage/history/:project`: Retrieves the code coverage history for a specific project.

### Data Model

<small style="color: orange; font-style: italic">SUBJECT TO CHANGE</small>


The code coverage history is stored in the MongoDB database using the following data model:

```typescript
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
```

## Data Validation

The Data Service utilizes `mongoose-validator` to validate the data before storing it in the database.

## Testing

To run the tests for the Data Service, follow the instructions below:

1. Go to the root of the project: `cd code-coverage-monitor`
2. Run the tests for the Data Service: `cd services/data-service && yarn test` (or `npm test`)

## Built With

The Data Service is built with the following technologies:

- [Express.js](https://expressjs.com/) - The web framework used
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool
- [Axios](https://www.npmjs.com/package/axios) - Promise-based HTTP client
- [Jest](https://jestjs.io/) - JavaScript testing framework - <small style="color: orange; font-style: italic">SUBJECT TO CHANGE</small>


## Authors

- **GitHub** - [olegkuibar](https://www.github.com/oleg-kuibar)
- **LinkedIn** - [olegkuibar](https://www.linkedin.com/in/olegkuibar/)
