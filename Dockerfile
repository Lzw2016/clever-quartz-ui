FROM 192.168.159.136:5000/node:10.15.2-alpine as dev

ADD ./server /app
WORKDIR /app
ENTRYPOINT ["node", "server.js", "--port", "8082"]
EXPOSE 8082
