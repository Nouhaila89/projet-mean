# Utiliser l'image officielle Nginx pour servir l'application Angular
FROM nginx:alpine

# Copier les fichiers de build de l'application Angular dans le répertoire de Nginx
COPY dist/ /usr/share/nginx/html

# Exposer le port 80 pour accéder à l'application Angular
EXPOSE 80

# Démarrer le serveur Nginx
CMD ["nginx", "-g", "daemon off;"]
