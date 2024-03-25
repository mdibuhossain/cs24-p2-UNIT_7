FROM node:alpine

WORKDIR /node-server

COPY package*.json ./

RUN npm install

COPY . .

RUN apk add openssl

EXPOSE 5000