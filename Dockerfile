FROM node:alpine3.12 as client

WORKDIR /usr/app/client/

COPY myapp/package*.json ./

RUN npm install

COPY myapp/ ./

RUN ls

RUN npm run build


FROM node:alpine3.12


WORKDIR /usr/src/app/

COPY --from=client /usr/app/client/build/ ./client/build/

WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm install

COPY server.js ./

EXPOSE 5000

CMD ["node", "server.js"]