FROM node:16

RUN apt-get update && apt-get -y upgrade;
RUN apt install swarm-cli;
RUN ./uploader.sh

