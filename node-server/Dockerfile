FROM node:alpine

WORKDIR /node-server

COPY package*.json ./

RUN npm install

COPY . .

RUN apk add openssl

RUN apk add --no-cache postgresql-client

EXPOSE 5000

RUN chmod +x wait-for-db.sh

CMD ["sh", "./wait-for-db.sh", "npm", "run", "start:prod"]
