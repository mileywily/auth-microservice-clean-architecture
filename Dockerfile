# ---- Etapa 1: Base ----
FROM node:20-alpine AS base
WORKDIR /app

# ---- Etapa 2: Dependencias ----
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---- Etapa 3: Construcción (Build) ----
FROM deps AS build
COPY . .
RUN npm run build

# ---- Etapa 4: Producción ----
FROM base AS production
ENV NODE_ENV=production

# 1. Aseguramos que el directorio sea del usuario node ANTES de copiar
# Alpine a veces requiere que seamos explícitos con los permisos del WORKDIR
RUN chown node:node /app

# 2. Cambiamos al usuario node
USER node

# 3. Copiamos los archivos (Docker mantendrá el dueño si lo especificamos)
COPY --from=deps --chown=node:node /app/package.json /app/package-lock.json ./

# 4. Instalamos. 
# Añadimos --no-cache para evitar que npm intente escribir en carpetas protegidas
RUN npm ci --omit=dev --no-cache

# 5. Copiamos el código compilado
COPY --from=build --chown=node:node /app/dist ./dist

CMD ["node", "dist/main.js"]