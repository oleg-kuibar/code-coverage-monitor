# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the image
WORKDIR /app

# Copy the package.json and yarn.lock files to the image
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the remaining application files
COPY . .

# Set environment variables
ENV NODE_ENV=production

# Load environment variables from .env file
RUN set -a && [ -f .env ] && . .env && set +a

# Expose the app's port
EXPOSE 3000

# Start the app
CMD [ "yarn", "start" ]
