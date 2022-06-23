// The PlagueCraft Network Discord Bot
// This project is liscensed under the MIT Open-Source License (https://opensource.org/licenses/mit)

// Copyright (c) 2021 The PlagueCraft Network
// Read the LICENSE file to learn more about the MIT Licenses

const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { env, tokens } = require('./config.json');

const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ]});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Event Handling
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(tokens["prod"])