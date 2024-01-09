FROM node:19-bullseye-slim


WORKDIR /usr/src/app

COPY package*.json .


RUN npm install

COPY * .

EXPOSE 3269

CMD ["node", "node.js"]