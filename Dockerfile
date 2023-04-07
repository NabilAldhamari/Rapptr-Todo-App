# Use the official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Generate the Prisma client
RUN npx prisma generate

# Expose port 8888 for the application
EXPOSE 8888

# Start the application
CMD ["npm", "start"]