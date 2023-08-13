FROM node:16-alpine

WORKDIR /usr/app
COPY ./ /usr/app
RUN npm ci

EXPOSE 3001
CMD ["node", "./server.js"]