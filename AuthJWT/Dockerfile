#FROM maven:3.8.4-openjdk-17-slim as BUILD
#WORKDIR /app
#COPY pom.xml .
#COPY src/ .src/
#RUN mvn clean package


FROM --platform=linux/amd64 amazoncorretto:21
WORKDIR /app
COPY /target/AuthJWT-0.0.1-SNAPSHOT.jar AuthJWT.jar
EXPOSE 8000
CMD ["java","-jar","AuthJWT.jar"]


