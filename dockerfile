# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:12.7-alpine as build

# Set the working directory
WORKDIR /app

# Add the 'node_modules' folder to '.dockerignore'

# Copy the package.json to install dependencies
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the angular codebase
COPY . .

# Generate the build of the application
RUN npm run build

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:1.17.1-alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/<cafe-frontend> /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
