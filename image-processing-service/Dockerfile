# Use official Node runtime as parent image
FROM node:18

# Set working directory in container
WORKDIR /app

# Copy package.json into working directory
COPY package*.json ./

# Install any needed dependencies
RUN npm install

# Copy app source to docker image
COPY . .

# Make port 3000 available outside container
EXPOSE 3000

# Command to run app using CMD
CMD [ "npm", "start" ]