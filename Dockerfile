FROM node:14
WORKDIR /main
COPY package*.json ./
RUN npm install
RUN npm install -g ts-node typescript

COPY . .

CMD [ "ts-node", "main.ts" ]
