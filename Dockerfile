FROM node:alpine

WORKDIR /src
ADD package.json package-lock.json ./
RUN npm install

ADD . .
