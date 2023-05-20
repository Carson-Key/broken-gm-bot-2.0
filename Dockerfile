# FROM ubuntu:22.04
FROM node:16

# Install Node and Its Dependencies
# USER root
# WORKDIR /home/app
# RUN apt-get update
# RUN apt-get -y install curl gnupg
# RUN curl -sL https://deb.nodesource.com/setup_16.x  | bash -
# RUN apt-get -y install nodejs

# Install Python and Its Dependencies
# RUN apt-get install python3 python3-pip -y
# RUN ln -s /usr/bin/python3.10 /usr/bin/python
# RUN apt-get install -y ffmpeg
# RUN pip3 install SpeechRecognition
# RUN pip3 install pydub

# Start The Bot
COPY ./app .env package*.json ./
RUN npm i
RUN node updateCommands.js
CMD ["node", "index.js"]
EXPOSE 3000