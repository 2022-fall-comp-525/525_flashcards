FROM ubuntu:latest

# Install custom tools, runtime, etc.
RUN apt update
RUN apt install -y git python3 sudo
