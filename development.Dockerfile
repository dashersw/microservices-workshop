FROM node:alpine

WORKDIR /app
VOLUME /src

RUN npm install -g nodemon

ADD package.json package-lock.json ./
RUN npm install

CMD ["nodemon", "src"]
