FROM node:13.5-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json /usr/src/app/

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install --production \
    && apk del .gyp

# Bundle app source
COPY . /usr/src/app

# NAT
EXPOSE 8050

# Runtime
ENV NODE_ENV production
CMD [ "npm", "start" ]
