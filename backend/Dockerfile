# Utiliser l'image officielle Node.js 16
FROM node:16

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Installer nodemon globalement
RUN npm install -g nodemon

# Copier le reste de l'application
COPY . .

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
