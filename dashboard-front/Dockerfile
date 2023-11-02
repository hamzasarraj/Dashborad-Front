FROM node:14.17.6-buster-slim AS builder 
WORKDIR /app
COPY  .  .  
RUN  npm install  -g @angular/cli@13.3.8     
FROM nginx:1.17.6
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
COPY ./nginx.conf /etc/nginx/conf/default.conf

 # Containers run nginx with global directives and daemon off
EXPOSE 80 
ENTRYPOINT ["nginx", "-g", "daemon off;"]
