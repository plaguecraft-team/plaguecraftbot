// The PlagueCraft Network Discord Bot
// This project is liscensed under the MIT Open-Source License (https://opensource.org/licenses/mit)

// Copyright (c) 2021 The PlagueCraft Network
// Read the LICENSE file to learn more about the MIT Licenses


// Calling all packages needed for this project
const Discord = require('discord.js');
const fs = require('fs');
const request = require('request');
const ms = require('ms');

// const fetch = require('node-fetch'); - For a future update

// Require dotenv to hide token on Git lol
require('dotenv').config();

// Create the prefix
const prefix = 'pcn!';

// Create the bot client
const client = new Discord.Client();

// Create the command collection
client.commands = new Discord.Collection();

// Loop around ./commands to check for command files
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
	const command = require	(`./commands/${file}`);

	client.commands.set(command.name, command);
}

	// Once the bot is started, log it and set the status
client.once('ready', () => {
	console.log('Initiated the PlagueCraft Network Discord Bot -- Online and ready to go!');
	client.user.setActivity("'pcn!' messages!", { type: "LISTENING" })
});

client.on('message', message =>{
	// If the message does not start with the prefix OR is a bot..
	if(!message.content.startsWith(prefix) || message.author.bot) return;

		// Tells the bot how to handle command args
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	// Command Handler

	if(command === 'ping'){
		client.commands.get('ping').execute(message, args);
	} else if (command === 'help') {
		client.commands.get('help').execute(message, args);
	} else if (command === 'ip') {
		client.commands.get('ip').execute(message, args);
	} else if (command === 'ticket') {
		client.commands.get('ticket').execute(message, args, Discord, client);
	} else if (command === 'kick') {
		client.commands.get('kick').execute(message, args, Discord, client);
	} else if (command === 'ban') {
		client.commands.get('ban').execute(message, args, Discord, client); 
	} else if (command === 'mute') {
		client.commands.get('mute').execute(message, args, Discord, client);
	} else if (command === 'unmute') {
		client.commands.get('unmute').execute(message, args, Discord, client);
	} else if (command === 'clear') {
		client.commands.get('clear').execute(message, args, Discord, client);
	} else if (command === 'mod-help') {
		client.commands.get('mod-help').execute(message, args, Discord, client);
	} else if (command === 'suggest') {
		client.commands.get('suggest').execute(message, args, Discord, client);
	} else if (command === 'support') {
		client.commands.get('support').execute(message, args, Discord, client);
	} else if (command === 'report') {
		client.commands.get('report').execute(message, args, Discord, client);
	} else if (command === 'respond') {
		client.commands.get('report-resp').execute(message, args, Discord, client);
	} else if (command === 'stats') {
		client.commands.get('stats').execute(message, args, Discord, client, request);
	} else if (command === 'tempmute') {
		client.commands.get('tempmute').execute(message, args, Discord, client, ms);
	}
})


// Gets the token from the gitignore'd file ;)
const token = process.env.DISCORD_TOKEN

client.login(`${token}`)