FROM ubuntu:14.04

RUN apt-get update && apt-get install -y \
    autoconf \
    build-essential \
    libbz2-dev \
    libcurl4-openssl-dev \
    libevent-dev \
    libffi-dev \
    libglib2.0-dev \
    libncurses-dev \
    libpq-dev \
    libreadline-dev \
    libssl-dev \
    libxml2-dev \
    libxslt-dev \
    libyaml-dev \
    zlib1g-dev \
    ca-certificates \
    curl \
    software-properties-common

RUN add-apt-repository ppa:chris-lea/node.js
RUN apt-get update
RUN apt-get -y install nodejs

RUN apt-get install git-core -y

RUN useradd -ms /bin/bash deployer
RUN echo "deployer:deployer" | chpasswd && adduser deployer sudo
RUN mkdir -p /home/deployer/shopping_list && chown -R deployer:deployer /home/deployer/shopping_list
ENV HOME /home/deployer
RUN echo "%sudo        ALL=NOPASSWD: ALL" >> /etc/sudoers
USER deployer
ENV DOCKER true
EXPOSE 1337

RUN sudo npm install sails grunt -g
RUN sudo npm install validator -g

VOLUME ["/home/deployer/shopping_list"]

# Define working directory.
WORKDIR /home/deployer/shopping_list

# Set up gems
ADD package.json /home/deployer/shopping_list/package.json
RUN sudo chown -R deployer /home/deployer
RUN sudo chown -R deployer /home/deployer/*
RUN sudo chown -R deployer /home/deployer/shopping_list/*
RUN npm install

ADD . /home/deployer/shopping_list
RUN sudo chown -R deployer /home/deployer/shopping_list/*


