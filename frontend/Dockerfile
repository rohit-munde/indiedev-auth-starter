FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4200

ENV PATH /app/node_modules/.bin:$PATH

CMD ["ng", "serve", "--host", "0.0.0.0"]
