FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN sudo npm install
COPY . .
RUN sudo npm run build
EXPOSE 3000
CMD ["npm", "start"]