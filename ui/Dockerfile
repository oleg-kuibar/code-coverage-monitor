# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the remaining application files
COPY . .

# Specify the command to run the application
CMD [ "yarn", "run", "dev" ]
