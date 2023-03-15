#!/bin/sh
set -e

echo "Installing nodejs apt-get ..."
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "Installing yarn..."
sudo npm i -g yarn

echo  "Installing pm2"
sudo npm install -g pm2

echo "Installing zx script"
sudo npm i -g zx

echo "==> Installation done please follow the next command"

sudo pm2 startup systemd
