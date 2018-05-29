# Accessible Mcroservices with Node.js and Docker

An example microservices implementation with Node.js and Docker

## Requirements
Make sure you have the latest Docker and docker-compose installed. You may also want to have PM2 installed globally via `npm i -g pm2`.

## Setup
Clone the repository:
```
git clone git@github.com:dashersw/microservices-workshop.git
```

## Quickstart
### Start the application
```
cd microservices-workshop
docker-compose up
```

This runs the app in development mode and any changes to the microservices will live-reload.

### Test example request
```
node test.js
```

## Starting with PM2
Another approach for development is to use PM2 as a process monitor. You can start the app with;
```
pm2 start food
```

## Production builds
Run the following for a production setup. The main difference with the test version is live-reloading — The production version doesn't live-reload any changes and will require you to re-build your images.

```
docker-compose -f docker-compose.prod.yml up
```
