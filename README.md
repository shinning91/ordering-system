# Ordering System for Hotel
This is a simple implementation of ordering system for hotel built using NodeJS, Express and MongoDB in a microservices architecture.

Currently implemented 3 services:
- web (use as the main service that will talk to other services. should be used as an client facing service for frontend stuffs) 
- order (order service to handle order related API)
- payment (payment service to handle service related API)

NGINX will be run on port 80.
All services are run in separeted docker containers where the web service exposed on port 8080 for the proxy API.
Order and Payment services will run in their own dedicated port 3001 and 3002 respectively.

## How to run locally

Run `docker-compose up --build` to build the containers and run them.

## Demo

Services were deployed on AWS EC2: http://ec2-3-137-190-12.us-east-2.compute.amazonaws.com/

Use Postman to test the API endpoints

## Future improvement
- Add validation on the API endpoints
- Add other services such as Hotel and Customer for a complete flow
- Front-end UI and UX to be implemented
- Athentication where only logged in user can use payment API
- Unit Test for all API endpoints
- Kubernetes for services scaling
