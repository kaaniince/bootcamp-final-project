# Node.js imajını kullan
FROM node:18

# Çalışma dizini belirle
WORKDIR /app

# Bağımlılık dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama dosyalarını kopyala
COPY . .

# Backend'in çalışacağı portu aç
EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "start"]
