FROM node:18

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV MONGODB_USERNAME=root

ENV MONGODB_PASSWORD=secret

ENV MONGODB_URL=mongodb

ENV MONGODB_NAME=todo-dev

ENV PORT=5000

CMD ["npm","run","dev"]