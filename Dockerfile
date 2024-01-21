# Use an official Node.js LTS (14.x) image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript project
RUN npm run build

# Expose the WebSocket port (replace with your actual WebSocket port)
EXPOSE 8080

# Command to run the application
CMD [ "npm", "start" ]