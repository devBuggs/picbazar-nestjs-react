#! /bin/bash

echo "Enter your server username (ex: ubuntu)"
read username

echo "Enter server ip address (ex: 11.111.111.11)"
read ip_address

echo "########### connecting to server... ###########"
echo "${username}"
echo "${ip_address}"
ssh -o StrictHostKeyChecking=no -l "${username}" "${ip_address}" "sudo mkdir -p /var/www/pickbazar-react; sudo chown -R \$USER:\$USER /var/www; sudo apt install zip unzip";

if [ -d "./api" ]; then
  echo 'Build API'
  yarn --cwd ./api/rest
  yarn --cwd ./api/rest build
  rm -rf ./api/rest/node_modules

  yarn --cwd ./api/graphql
  yarn --cwd ./api/graphql build
  rm -rf ./api/graphql/node_modules

  echo 'Zipping api folder'
  zip -r ./api.zip ./api
fi

if [ -d "./deployment" ]; then
  echo 'Zipping deployment folder'
  zip -r ./deployment.zip ./deployment
fi

if [ -f "./api.zip" ] && [ -f "./deployment.zip" ]; then
    echo 'Uploading api.zip to server...'
    scp "./api.zip" "${username}@${ip_address}:/var/www/pickbazar-react"
    echo 'uploaded api.zip to server'
    ssh -o StrictHostKeyChecking=no -l "${username}" "${ip_address}" "unzip /var/www/pickbazar-react/api.zip -d /var/www/pickbazar-react";

    echo 'Uploading deployment.zip to server...'
    scp "./deployment.zip" "${username}@${ip_address}:/var/www/pickbazar-react"
    echo 'uploaded deployment.zip to server'
    ssh -o StrictHostKeyChecking=no -l "${username}" "${ip_address}" "unzip /var/www/pickbazar-react/deployment.zip -d /var/www/pickbazar-react";
else
  echo "pickbazar api and deployment zip file missing"
fi

echo "installing google zx for further script"
npm i -g zx
