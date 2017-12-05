FROM node:alpine

WORKDIR /src
ADD package.json .
RUN npm install

ADD . .
