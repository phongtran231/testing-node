FROM node:14.21.2 as development

ENV TZ="Asia/Ho_Chi_Minh"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build