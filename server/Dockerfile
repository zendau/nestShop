FROM node:14
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g @nestjs/cli
RUN npm install
COPY . .
ENV PORT 8080

# Expose port to access server
EXPOSE $PORT
# Command to run our app
CMD [ "npm", "start"]