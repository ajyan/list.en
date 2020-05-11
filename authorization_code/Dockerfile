FROM node:12
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm install

EXPOSE 8888
CMD ["node", "./app.js"]