FROM node:19.3.0

COPY package.json package.json

RUN npm install

COPY /build . 

EXPOSE 3000
CMD [ "node", "index.js" ]