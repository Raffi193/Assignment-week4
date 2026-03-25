# image Node.js versi LTS yang ringan (Alpine Linux)
FROM node:20-alpine

# Set working directory di dalam container
WORKDIR /app

# Copy package.json & package-lock.json terlebih dahulu
COPY package*.json ./

# Install dependencies production (tanpa devDependencies)
RUN npm install --omit=dev

# Copy seluruh source code ke dalam container
COPY . .

# Expose port yang digunakan app
EXPOSE 3000

# Perintah untuk menjalankan aplikasi
CMD ["node", "app.js"]