const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const chalk = require('chalk');
const config = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(__dirname + `/commands/${file}`);
	commands.push(command.data.toJSON());
}

var token = config.tokens.dev;
var clientId = config.client.dev.client;
var guildId = config.client.dev.guild;

const rest = new REST({ version: '9' }).setToken(token);

try {
    rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: [] },
    );

    rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands },
    );

    console.log(chalk.greenBright.bold('Successfully registered application commands.'));
    process.exit(0);
} catch (error) {
    console.error(error);
}