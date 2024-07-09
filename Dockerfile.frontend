FROM node:22-alpine3.19

WORKDIR /app

COPY frontend/package*.json /app/

RUN npm install

COPY /frontend/* /app/

EXPOSE 3000

CMD ["npm", "run", "dev"]