FROM node:18-bullseye-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/main.js"]
