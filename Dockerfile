# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install          # install dev + prod deps
COPY . .
RUN npm run build        # build TS to JS (dist folder)

# Stage 2: production
FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 4000
CMD ["node", "dist/index.js"]
