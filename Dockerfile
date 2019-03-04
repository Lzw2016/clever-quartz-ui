FROM 172.16.29.104:8850/node:10.15.2-alpine as dev

ADD ./server /app
WORKDIR /app
ENTRYPOINT ["node", "server.js", "--port", "8883"]
EXPOSE 8883
