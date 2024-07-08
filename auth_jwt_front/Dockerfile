FROM --platform=linux/amd64 node:20.11.0-alpine

WORKDIR /app

COPY . .

RUN npm install

CMD [ "npm", "start" ]