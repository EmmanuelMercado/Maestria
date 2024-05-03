FROM node:20.12
 
RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api
COPY . /usr/src/api
 
RUN npm install
 
RUN npm install -g typescript
RUN tsc
 
EXPOSE 3000
 
CMD ["npm", "run", "qa"]