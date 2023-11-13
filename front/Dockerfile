# pull official base image
FROM node:18.16.0-alpine AS node

# set working directory
WORKDIR /front/

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

RUN npm install && npm react-scripts
# add app
COPY . ./

#ENV
ENV NODE_ENV production
# PORT
EXPOSE 3000
# start app
CMD ["npm", "start"]
