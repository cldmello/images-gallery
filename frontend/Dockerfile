FROM node:16-alpine

WORKDIR /app

EXPOSE 3000

COPY package.json package-lock.json .env.local ./

RUN npm install --silent

CMD ["npm", "start"]
