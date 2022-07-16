FROM node:8

ARG TODO_SERVER_PORT
ARG TODO_SOURCE_HOST

WORKDIR /src

COPY package.json ./
RUN npm install --production

RUN mkdir ./src
COPY src ./src
COPY proto ./proto
COPY index.js .

EXPOSE 3000

ENV TODO_SERVER_PORT=$TODO_SERVER_PORT
ENV TODO_SOURCE_HOST=$TODO_SOURCE_HOST 

CMD ["npm", "start"] 
