# Code Coverage Monitor

This repository contains a web application that allows you to monitor the code coverage of your projects over time. It includes an auth microservice, a data microservice, and a UI.

## Getting Started

### Prerequisites

- [Node.js 16+](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### With Docker

1. Clone the repository: `git clone https://github.com/olegkuibar/code-coverage-monitor.git`
2. Navigate to the root of the project: `cd code-coverage-monitor`
3. Run `start-docker.sh` to start the services (this will create network and run compose)

### Without Docker


Prerequisites:

- [MongoDB](https://www.mongodb.com/)

Run local MongoDB instance.

1. Install MongoDB from [here](https://www.mongodb.com/try/download/community)
2. Run MongoDB instance with default settings by running `mongod` in terminal
3. Create database `auth-service` and collection `users` in MongoDB
4. Create database `data-service` and collection `coverageHistory` in MongoDB

Starting the services:

1. Clone the repository: `git clone https://github.com/olegkuibar/code-coverage-monitor.git`
2. Install the dependencies for each service: `yarn install` (or `npm install`) in the root, `/services/auth-service`, `/services/data-service`, and `/ui` directories.

## Documentation

- [System Graph](docs/SYSTEM_GRAPH.md)
- [Commit Guidelines](docs/COMMIT_GUIDELINES.md)
- [User Flow](docs/USER_FLOW.md)

## Auth Microservice

The auth microservice is responsible for user registration, login, and logout, and is responsible for generating and validating JSON web tokens (JWT) used to authenticate requests. It also issues cookies to the front-end.

## Data Microservice

The data microservice is responsible for serving data to the front-end, but only allows certain requests for authenticated users. It validates the cookie issued by the auth service to the UI app.

### Data Model

The data microservice uses MongoDB to store the code coverage history. The data model is defined in `src/models/coverageHistory.ts` and has the following fields:

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


### API Endpoints

<small style="color: orange; font-style: italic">SUBJECT TO CHANGE</small>

The data microservice has the following API endpoints:

- `GET /coverage/history`: Retrieves the code coverage history for all projects.
- `POST /coverage/history`: Adds a new code coverage entry to the history for a specific project.
- `GET /coverage/history/:project`: Retrieves the code coverage history for a specific project.

### Data Validation

The data microservice uses `mongoose-validator` to validate the data before saving it to the database.

## UI

The UI is a Next.js application that displays the code coverage history using the [Prism](https://prismjs.com/) library. It communicates with the data microservice to retrieve the code coverage history and updates the graph in real-time.

## Load Balancer

We are using HAProxy as a load balancer, you can find its configuration file in `/haproxy/haproxy.cfg`

## Running tests

To run the tests, you can use `yarn test` (or `npm test`) in the root, `/auth`, `/data`, and `/ui` directories.

## Built With

<details>
  <summary>Click to Expand: Technologies List</summary>

- [Express.js](https://expressjs.com/) - The web framework used
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool
- [Passport](http://www.passportjs.org/) - Authentication middleware
- [Helmet](https://helmetjs.github.io/) - HTTP security headers
- [Body-parser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware
- [Next.js](https://Next.jsjs.org/) - JavaScript library for building user interfaces
- [Prism](https://prismjs.com/) - JavaScript library for syntax highlighting
- [Docker](https://www.docker.com/) - Containerization platform
- [HAProxy](https://www.haproxy.com/) - Load balancer
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client
- [Istanbul](https://istanbul.js.org/) - JavaScript code coverage tool
- [Jest](https://jestjs.io/) - JavaScript testing framework
- [Chart.js](https://www.chartjs.org/) - JavaScript library for data visualization

</details>

## Authors
* **GitHub** - [olegkuibar](https://www.github.com/oleg-kuibar)
* **LinkedIn** - [olegkuibar](https://www.linkedin.com/in/olegkuibar/)


## Docker

This project comes with a `docker-compose.yml` for easy deployment.

### Running the services

To run the services, navigate to the root of the project and run:

```bash 
docker-compose up
```

As alternative to build images, navigate to the root of the project and execute bash script `start-docker.sh`.

This will set up network, build the images and run the services.

### Stopping the services

To stop the services, navigate to the root of the project and run:
```bash
docker-compose down
```


## Project Structure

- `/src`: Contains the source code for the auth and data microservices.
- - `/auth-service`: The Express.js application for handling user authentication and JWT generation/validation.
- - `/data-service`: The Express.js application for handling data storage and retrieval.
- - `/frontend`: The Next.js.js application for displaying code coverage history and improvements/degradation over time.
- `/data`: The MongoDB data volume.
- `/shared`: A place for shared code between services.
- `/config`: Contains the configuration files for the services.

## Deployment

The recommended way to deploy this project is through Docker. The services can also be deployed separately, but will require additional configuration.

## Conclusion

This project is a simple web app that consumes an XML file with code coverage results, saves them to a MongoDB database, and visualizes the history and improvements/degradation of the code coverage over time using Prism. The project uses Node.js and Next.js for the frontend, and Express.js and MongoDB for the backend. It also includes multithreading, RBAC authentication, and load balancing. The code is structured in a monorepo with a clear separation of concerns, and comes with a `Dockerfile` and `docker-compose.yml` for easy deployment.
