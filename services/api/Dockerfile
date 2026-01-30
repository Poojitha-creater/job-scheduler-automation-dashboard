FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
# Install dependencies (including dev deps for TypeScript build)
RUN npm install --include=dev
COPY . .
# Generate Prisma client and build TypeScript
RUN npx prisma generate
RUN npm run build
CMD ["npm", "start"]
