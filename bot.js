// The PlagueCraft Network Discord Bot
// This project is liscensed under the MIT Open-Source License (https://opensource.org/licenses/mit)

// Copyright (c) 2021 The PlagueCraft Network
// Read the LICENSE file to learn more about the MIT Licenses

// Calling all packages needed for this project
const Discord = require('discord.js');
const fs = require('fs');

// Require dotenv to hide token on Git lol
require('dotenv').config();

// Create the bot client
const client = new Discord.Client();

// Prepare the command & event handlers 
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command-handler', 'event-handler'].forEach(handler => {
	require(`./handlers/${handler}`)(client, Discord)
})

// Gets the token from the gitignore'd file ;)
const token = process.env.DISCORD_TOKEN

client.login(`${token}`)