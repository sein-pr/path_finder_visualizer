# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Use a web server to serve the built app
# You can use nginx, serve, or any other static file server
# For simplicity, we'll use the 'serve' package here
RUN npm install -g serve

# Set the command to run the app using 'serve'
CMD ["serve", "-s", "build"]

# Expose the port the app runs on
EXPOSE 3000
