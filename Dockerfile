# Base image
FROM node:14-alpine

# Define working directory
WORKDIR /frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Copy the rest of the application code to the working directory
COPY ./* .

#COPY frontend/* /frontend/
#COPY frontend/. /frontend/.

RUN ls -la /frontend/*
RUN ls -la /frontend/public/*
RUN ls .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
#COPY . .


RUN npm install socket.io-client
RUN npm ci

# Build the React app
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["npm", "start"]

