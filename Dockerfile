FROM node:18.1-alpine

ENV PORT=3000

COPY . /home/nodejs

WORKDIR /home/nodejs

RUN npm install

CMD ["node", "index.js"]