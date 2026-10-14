# Giai đoạn 1: Build ứng dụng React (sử dụng Node.js 20 để hỗ trợ Vite/Rolldown)
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Giai đoạn 2: Sử dụng Nginx để phục vụ file tĩnh sau khi build
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]