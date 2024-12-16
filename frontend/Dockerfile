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

# Frontend'in çalışacağı portu aç
EXPOSE 5173

# Uygulamayı başlat
CMD ["npm", "run", "dev"]
