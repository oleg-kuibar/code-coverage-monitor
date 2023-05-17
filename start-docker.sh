#!/bin/bash

NETWORK_NAME="code_coverage"

# Check if the network already exists
if ! docker network inspect $NETWORK_NAME >/dev/null 2>&1; then
  # Create the network if it doesn't exist
  docker network create $NETWORK_NAME
else
  echo "Network '$NETWORK_NAME' already exists."
fi

# Check if the script has executable permissions
if [[ ! -x "$0" ]]; then
  # Set executable permissions for the script
  chmod +x "$0"
fi

docker-compose up -d --build