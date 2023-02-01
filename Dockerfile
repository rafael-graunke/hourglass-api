FROM node:lts-alpine

WORKDIR /usr/share/app

COPY . .

CMD [ "node", "/usr/share/app/dist/server.js" ]
