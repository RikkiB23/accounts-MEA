# Use official Node.js image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Expose the frontend dev server port
EXPOSE 5000

# Start React dev server (for dev)
CMD ["npm", "run", "dev"]