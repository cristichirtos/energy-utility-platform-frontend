FROM node:14.17.6-alpine 
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
ENV PATH /app/node_modules/.bin:$PATH
# Build the app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
# ==== RUN =======
# Set the env to "production"
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]
