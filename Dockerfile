FROM arm64v8/node:8.12.0-alpine

RUN apk update
RUN apk upgrade yarn npm

RUN yarn install

RUN yarn global add serve

WORKDIR /usr
COPY . /usr

RUN yarn build

EXPOSE 5000

CMD serve -s build