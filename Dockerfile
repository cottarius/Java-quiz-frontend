# Этап сборки
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

# Этап продакшн (только статика)
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
# Убираем копирование nginx.conf — он будет в отдельном сервисе
EXPOSE 80