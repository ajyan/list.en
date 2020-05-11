FROM node:12
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm install

EXPOSE 3000
CMD ["npm start"]