#!/usr/bin/env zx

echo(chalk.blue("Front end project build"));

echo(chalk.blue("#Step 9: Setting Up Server & Project"));
let domainName = await question("What is your domain name? ");
echo(chalk.green(`Your domain name is: ${domainName} \n`));

echo(chalk.blue("#Step 1 - Config Next Admin App For /admin Sub Directory"));
await $`cp admin/rest/next.config.js ./admin/rest/temp.js`;
await $`awk '{sub(/i18n,/, "i18n,basePath:\`/admin\`,"); print $0}' ./admin/rest/temp.js > ./admin/rest/next.config.js`;
await $`rm -rf ./admin/rest/temp.js`;

await $`cp ./admin/graphql/next.config.js ./admin/graphql/temp.js`;
await $`awk '{sub(/i18n,/, "i18n,basePath:\`/admin\`,"); print $0}' ./admin/graphql/temp.js > ./admin/graphql/next.config.js`;
await $`rm -rf ./admin/graphql/temp.js`;

echo(chalk.blue("#Step 1 - Installing Frontend project dependencies"));

echo(
    "Please wait a while till the successful installation of the dependencies"
);

echo("yarn");
await $`yarn`;

let whichConfig = await question(
    "What api do you want to use? Enter 1 for REST api or 2 for GraphQL: "
);
if (whichConfig == 1) {
    await $`rm -f ./shop/.env`;
    await $`cp ./shop/.env.template ./shop/.env`;
    await $`chmod 777 ./shop/.env`;
    await $`awk '{gsub(/NEXT_PUBLIC_REST_API_ENDPOINT=.+"$/,"NEXT_PUBLIC_REST_API_ENDPOINT=\\"https://${domainName}/api\\""); print $0}' ./shop/.env.template > ./shop/.env`;
    await $`awk '{gsub(/FRAMEWORK_PROVIDER=.+"$/,"FRAMEWORK_PROVIDER=\\"rest\\""); print $0}' ./shop/.env > ./shop/tmp && mv ./shop/tmp ./shop/.env && rm -rf ./shop/tmp`;

    await $`rm -f ./admin/rest/.env`;
    await $`cp ./admin/rest/.env.template ./admin/rest/.env`;
    await $`chmod 777 ./admin/rest/.env`;
    await $`awk '{gsub(/NEXT_PUBLIC_REST_API_ENDPOINT=.+"$/,"NEXT_PUBLIC_REST_API_ENDPOINT=\\"https://${domainName}/api\\""); print $0}' ./admin/rest/.env.template > ./admin/rest/.env`;

    await $`cp ./shop/tsconfig.rest.json ./shop/tsconfig.json`;

    await $`cp ./shop/next.config.js ./shop/temp.js`;
    await $`awk '{sub(/YOUR_DOMAIN/, "${domainName}"); print $0}' ./shop/temp.js > ./shop/next.config.js`;
    await $`rm -rf ./shop/temp.js`;

    await $`cp ./admin/rest/next.config.js ./admin/rest/temp.js`;
    await $`awk '{sub(/YOUR_DOMAIN/, "${domainName}"); print $0}' ./admin/rest/temp.js > ./admin/rest/next.config.js`;
    await $`rm -rf ./admin/rest/temp.js`;
} else {
    await $`rm -f ./shop/.env`;
    await $`cp ./shop/.env.template ./shop/.env`;
    await $`chmod 777 ./shop/.env`;
    await $`awk '{gsub(/NEXT_PUBLIC_GRAPHQL_API_ENDPOINT=.+"$/,"NEXT_PUBLIC_GRAPHQL_API_ENDPOINT=\\"https://${domainName}/graphql\\""); print $0}' ./shop/.env.template > ./shop/.env`;
    await $`awk '{gsub(/FRAMEWORK_PROVIDER=.+"$/,"FRAMEWORK_PROVIDER=\\"graphql\\""); print $0}' ./shop/.env > ./shop/tmp && mv ./shop/tmp ./shop/.env && rm -rf ./shop/tmp`;

    await $`rm -f ./admin/graphql/.env`;
    await $`cp ./admin/graphql/.env.template ./admin/graphql/.env`;
    await $`chmod 777 ./admin/graphql/.env`;
    await $`awk '{gsub(/NEXT_PUBLIC_GRAPHQL_API_ENDPOINT=.+"$/,"NEXT_PUBLIC_GRAPHQL_API_ENDPOINT=\\"https://${domainName}/graphql\\""); print $0}' ./admin/graphql/.env.template > ./admin/graphql/.env`;
    await $`awk '{gsub(/NEXT_PUBLIC_API_ROOT=.+"$/,"NEXT_PUBLIC_API_ROOT=\\"https://${domainName}/api\\""); print $0}' ./admin/graphql/.env > ./admin/graphql/tmp && mv ./admin/graphql/tmp ./admin/graphql/.env && rm -rf ./admin/graphql/tmp`;

    await $`cp ./shop/tsconfig.graphql.json ./shop/tsconfig.json`;

    await $`cp ./shop/next.config.js ./shop/temp.js`;
    await $`awk '{sub(/domains:\\ \\[/, "domains: [ \`${domainName}\`,"); print $0}' ./shop/temp.js > ./shop/next.config.js`;
    await $`rm -rf ./shop/temp.js`;

    await $`cp ./admin/graphql/next.config.js ./admin/graphql/temp.js`;
    await $`awk '{sub(/domains:\\ \\[/, "domains: [ \`${domainName}\`,"); print $0}' ./admin/graphql/temp.js > ./admin/graphql/next.config.js`;
    await $`rm -rf ./admin/graphql/temp.js`;
}

if (whichConfig == 1) {
    echo("Build For REST api");
    await $`yarn --cwd ./ build:shop-rest`;
    await $`yarn --cwd ./ build:admin-rest`;
} else {
    echo("Build For GraphQL api");
    await $`yarn --cwd ./ build:shop-gql`;
    await $`yarn --cwd ./ build:admin-gql`;
}

echo(chalk.blue("#Upload project file to server"));
let username = await question("Enter your server username (ex: ubuntu): ");
let ip_address = await question(
    "Enter server ip address (ex: 11.111.111.11): "
);

echo("########### connecting to server... ###########");

echo("Remove node_modules folder");
await $`rm -rf shop/node_modules`;
await $`rm -rf admin/rest/node_modules`;
await $`rm -rf admin/graphql/node_modules`;
await $`rm -rf ./node_modules`;

echo("Zipping shop, admin, package.json, babel.config.js and yarn.lock folder");

await $`zip -r frontend.zip shop admin package.json babel.config.js yarn.lock`;

echo(chalk.green("frontend.zip file created"));
let front_end_source_path = "./frontend.zip";
echo("Uploading frontend.zip to server, Please wait...");
await $`scp ${front_end_source_path} ${username}@${ip_address}:/var/www/pickbazar-react`;
echo(chalk.green("Uploaded frontend.zip to server"));

await $`ssh -o StrictHostKeyChecking=no -l ${username} ${ip_address} "unzip /var/www/pickbazar-react/frontend.zip -d /var/www/pickbazar-react";`;

echo(chalk.green("Your application build successful"));
