FROM node:18.12.1

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE $PORT

ADD docker-run.sh /
RUN chmod +x /docker-run.sh

CMD ["npm", "run", "dev"]