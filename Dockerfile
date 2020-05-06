FROM node:12.16.2-alpine as builder

# env set
# ENV EVA_ENTRYPOINT=/api

WORKDIR /app
COPY ./dist ./

# npm install
# If you are building your code for production
# RUN npm ci --only=production
RUN npm ci --only=production

# Bundle app source
# COPY . .


# opt:remove node:12.16.2-alpine to alpine to start build
FROM node:12.16.2-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 8080
CMD ["node","server.js"]