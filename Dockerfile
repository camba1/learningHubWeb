# ===== Build Stage =====
FROM node:22-alpine AS build
LABEL authors="jperedo"

# Create and change to the app directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the source code into the container
COPY . .

# Build the project
RUN npm run build

# ===== Run Stage =====
FROM node:22-alpine
LABEL authors="jperedo"
ENV NODE_ENV=production

# Create a group and user
#RUN addgroup -S sveltekitgroup && adduser -S sveltekituser -G sveltekitgroup

# Create and change to the app directory
WORKDIR /app

# Copy the build output from the build stage
COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./

# Install production dependencies
RUN npm install --production

# Change ownership of the app directory to the non-root user
#RUN chown -R sveltekituser:sveltekitgroup /app

# Switch to the non-root user
#USER sveltekituser

# Expose the port that the application runs on
EXPOSE 3000

# Start the application
#CMD ["node", "build"]
CMD  BODY_SIZE_LIMIT=20000000 ORIGIN=http://localhost:3000  node build