FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm pkg set scripts.prepare="echo 'Running husky'" && npm install --omit=dev 
COPY assets ./assets
COPY src ./src
EXPOSE 12004

WORKDIR /app/src
CMD ["node", "server.js"]
