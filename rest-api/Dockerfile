FROM node:12.16-alpine

WORKDIR /user/src/app
COPY package* ./
RUN ["npm", "install"]

COPY src/ src/

EXPOSE 8080

CMD ["npm", "start"]
