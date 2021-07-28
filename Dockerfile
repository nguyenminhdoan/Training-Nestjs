FROM node:12

#create app dir, this is in container / in image
WOKRDIR /usr/src/app

#install app dependencies 
COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

EXPOSE 8080



CMD ["node", "dist/main"]