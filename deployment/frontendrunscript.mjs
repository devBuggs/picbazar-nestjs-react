#!/usr/bin/env zx
echo(chalk.blue("#Step 1 - Installing Frontend project dependencies"));

echo(
    "Please wait a while till the successful installation of the dependencies"
);
await $`yarn --cwd /var/www/pickbazar-react/`;

echo(chalk.blue("Make sure to select the REST or GraphQL"));
let whichConfig = await question(
    "What do you want to use for frontend? Enter 1 for REST or 2 for GraphQL: "
);

if (whichConfig == 1) {
    echo(chalk.blue("Running For Shop Rest API with pm2"));

    await $`pm2 --name shop-rest start yarn --cwd /var/www/pickbazar-react -- run start:shop-rest`;

    echo(chalk.blue("Running For Admin Rest API with pm2"));

    await $`pm2 --name admin-rest start yarn --cwd /var/www/pickbazar-react -- run start:admin-rest`;
} else {
    echo(chalk.blue("Running For Shop GraphQL API with pm2"));

    await $`pm2 --name shop-gql start yarn --cwd /var/www/pickbazar-react -- run start:shop-gql`;

    echo(chalk.blue("Running For Admin GraphQL API with pm2"));

    await $`pm2 --name admin-gql start yarn --cwd /var/www/pickbazar-react -- run start:admin-gql`;
}
