FROM node:22.14.0-alpine

WORKDIR /app

COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/

RUN npm install --workspace apps/backend

COPY apps/backend ./apps/backend

WORKDIR /app/apps/backend

EXPOSE 4000

CMD ["npm", "run", "start"]
