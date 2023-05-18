#!/bin/bash


# Define colors for table formatting
red=$(tput setaf 1)
green=$(tput setaf 2)
yellow=$(tput setaf 3)
blue=$(tput setaf 4)
reset=$(tput sgr0)

NETWORK_NAME="code_coverage"

# Check if the script has executable permissions
if [[ ! -x "$0" ]]; then
  # Set executable permissions for the script
  chmod +x "$0"
fi

# Check if the network already exists
if ! docker network inspect "$NETWORK_NAME" >/dev/null 2>&1; then
  # Create the network if it doesn't exist
  docker network create "$NETWORK_NAME"

  # Prompt the user to create a different network
  echo "${yellow}Network '$NETWORK_NAME' does not exist. Do you want to create a different network? (y/n)${reset}"
  read -r response
  if [[ "$response" =~ ^([yY][eE][sS]|[yY])+$ ]]; then
    echo "${blue}Enter the name of the network you want to create:${reset}"
    read -r NETWORK_NAME
    docker network create "$NETWORK_NAME"
  fi

  # Update docker-compose.yml file with the new network name
  sed -i "s/$NETWORK_NAME/code_coverage/g" docker-compose.yml

  # Notify the user that the network has been created and the compose file has been updated
  echo "${green}Network '$NETWORK_NAME' has been created, and the compose file has been updated.${reset}"
else
  echo "${yellow}Network '$NETWORK_NAME' already exists. Using the existing network.${reset}"
fi

# Extract the services from the docker-compose.yml file
mapfile -t services < <(docker-compose config --services)

# Check if any services are found
if [[ ${#services[@]} -eq 0 ]]; then
    echo "${red}No services found in the docker-compose.yml file.${reset}"
    exit 1
fi

# Prompt the user to select services
# Print table header
echo "${blue}INDEX   SERVICES${reset}"
echo "-------------------------"
for ((i=0; i<${#services[@]}; i++)); do
    echo "  ${green}$(($i+1)).${reset}    ${blue}${services[$i]}${reset}"
done
echo "-------------------------"
echo ""

read -p "${blue}Enter the numbers of the services to run (comma-separated, or leave empty to run all): ${reset}" selection

# Convert the user's input into an array of selected indexes
IFS=',' read -ra selected_indexes <<< "$selection"

# If no services were selected, run all services
if [[ -z $selection ]]; then
    mapfile -t selected_indexes < <(seq 1 ${#services[@]})
fi

# Build the Docker Compose command
compose_cmd="docker-compose up -d"
for index in "${selected_indexes[@]}"; do
    service_index=$((index - 1))
    compose_cmd+=" ${services[$service_index]}"
done

# Run the Docker Compose command
eval "$compose_cmd"