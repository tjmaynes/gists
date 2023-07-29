FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]