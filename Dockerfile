FROM node:lts-alpine

WORKDIR /usr/share/app

COPY . .

RUN npm i
RUN npm i --save-dev sequelize-cli
RUN npx sequelize-cli db:migrate

CMD [ "node", "/usr/share/app/dist/server.js" ]
