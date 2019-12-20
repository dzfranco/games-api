FROM node:carbon

# Create app directory
RUN mkdir -p /var/www
RUN mkdir -p /var/www/logs
WORKDIR /var/www

# Install yarn
RUN npm install -g yarn

# Install app dependencies
RUN yarn install


EXPOSE 3000 3001
CMD [ "node", "main" ]