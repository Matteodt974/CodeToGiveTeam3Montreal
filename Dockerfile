# Multi-stage build for Spring Boot + Angular application

# Stage 1: Build Angular frontend
FROM node:18-alpine AS angular-build
WORKDIR /app/frontend
  
  # Copy Angular project files (when you have them)
  # COPY frontend/package*.json ./
  # RUN npm install
  # COPY frontend/ ./
  # RUN npm run build
  
  # Stage 2: Build Spring Boot backend
FROM maven:3.9-eclipse-temurin-21 AS backend-build
WORKDIR /app
  
  # Copy Maven files
COPY pom.xml .
  # Download dependencies (cached layer)
RUN mvn dependency:go-offline -B
  
  # Copy source code
COPY src ./src
  
  # Copy built Angular files to Spring Boot static resources (when ready)
  # COPY --from=angular-build /app/frontend/dist/* ./src/main/resources/static/
  
  # Build the application
RUN mvn clean package -DskipTests
  
  # Stage 3: Runtime
FROM maven:3.9-eclipse-temurin-21
WORKDIR /app
  
  # Copy the built JAR file
COPY --from=backend-build /app/target/*.jar app.jar
  
  # Create directory for SQLite database
RUN mkdir -p /app/data
  
  # Expose port
EXPOSE 8080
  
  # Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
