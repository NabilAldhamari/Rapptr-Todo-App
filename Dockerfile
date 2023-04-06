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

# Initialize Prisma
RUN npx prisma init

# Pull the database schema
RUN npx prisma db pull

# Generate the Prisma client
RUN npx prisma generate

# Run the database seeder
RUN node ./config/seeds.js

# Expose port 8080 for the application
EXPOSE 8080

# Set the NODE_ENV environment variable
ENV NODE_ENV production

# Start the application
CMD ["npm", "start"]