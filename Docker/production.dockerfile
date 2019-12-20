FROM node:carbon AS build

# Create app directory
RUN mkdir -p /var/www
RUN mkdir -p /var/www/logs
RUN mkdir -p /var/www/tmp
WORKDIR /var/www

# Install yarn and pm2
RUN npm install -g yarn


# BUILD PROJECT
COPY ./ /var/www/
RUN yarn install --pure-lockfile
RUN yarn compile-native:prod
COPY package.json var/www/build
#RUN mv /var/www/build/.staging.env /var/www/build/.staging.env


#Layer 2, copy the project files and run
FROM node:carbon
# Copy from previous layer
COPY --from=build /var/www/build  /var/www/
COPY --from=build /var/www/node_modules /var/www/node_modules
WORKDIR /var/www

#SET NODE ENV
ENV NODE_ENV=production
#INSTALL PM2
RUN npm install -g pm2

EXPOSE 3000 3001
CMD ["node", "server/index.js" ]