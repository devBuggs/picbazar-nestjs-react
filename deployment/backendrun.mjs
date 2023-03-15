#!/usr/bin/env zx

echo(chalk.blue("#Step 1 - Installing backend project dependencies"));

echo(
    "Please wait a while till the successful installation of the dependencies"
);

echo(chalk.blue("Make sure to select the REST or GraphQL"));
let whichConfig = await question(
    "What do you want to use for frontend? Enter 1 for REST or 2 for GraphQL: "
);

if(whichConfig == 1) {
    echo(chalk.blue("Install packages"));
    await $`yarn --cwd /var/www/pickbazar-react/api/rest`;

    echo(chalk.blue("Running For API App with pm2"));

    await $`pm2 start --name=mock-rest yarn --cwd /var/www/pickbazar-react/api/rest -- start:prod`;
} else {
    echo(chalk.blue("Install packages"));
    await $`yarn --cwd /var/www/pickbazar-react/api/graphql`;

    echo(chalk.blue("Running For API App with pm2"));

    await $`pm2 start --name=mock-graphql yarn --cwd /var/www/pickbazar-react/api/graphql -- start:prod`;
}
