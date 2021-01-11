FROM node:latest

WORKDIR /app
COPY . /app

RUN npm install pm2 -g
RUN npm install --silent
RUN npm run build

RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
