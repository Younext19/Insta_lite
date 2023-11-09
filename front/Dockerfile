# pull official base image
FROM node:18.16.0

# set working directory
WORKDIR /front/

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN yarn

# add app
COPY . ./

#ENV
ENV NODE_ENV production
# PORT
EXPOSE 9999
# start app
CMD ["yarn", "start"]
