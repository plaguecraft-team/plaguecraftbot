// The PlagueCraft Network Discord Bot
// This project is liscensed under the MIT Open-Source License (https://opensource.org/licenses/mit)

// Copyright (c) 2021 The PlagueCraft Network
// Read the LICENSE file to learn more about the MIT Licenses

// Calling all packages needed for this project
const Discord = require('discord.js');
const fs = require('fs');
const util = require('minecraft-server-util');
const request = require('request');

// Require dotenv to hide token on Git lol
require('dotenv').config();

// Set prefix
const prefix = 'pcn!';

// Create the bot client
const client = new Discord.Client();

// Prepare the command handlers
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}

    client.once('ready', () => {
        console.log('The PlagueCraft Discord Bot has now come online! Fear me mortals!');
    });
     
    client.on('message', message =>{
        if(!message.content.startsWith(prefix) || message.author.bot) return;
     
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
     
        // General Commands
        if(command === 'help'){
            client.commands.get('help').execute(client, Discord, message, args);
        } else if (command === 'ping') {
            client.commands.get('ping').execute(client, Discord, message, args);
        } else if (command === 'apis') {
            client.commands.get('apis').execute(client, Discord, message, args);
        } else if (command === 'suggest') {
            client.commands.get('suggest').execute(client, Discord, message, args);
        } else if (command === 'support') {
            client.commands.get('support').execute(client, Discord, message, args);
        } else if (command === 'ticket') {
            client.commands.get('ticket').execute(client, Discord, message, args);
        } else if (command === 'ip') {
            client.commands.get('ip').execute(client, Discord, message, args);
        } else if (command === 'report') {
            client.commands.get('report').execute(client, Discord, message, args);
        } else if (command === 'stats') {
            client.commands.get('stats').execute(client, Discord, message, args, request);
        } else if (command === 'status') {
            client.commands.get('status').execute(client, Discord, message, args, util);
            // Moderation
        } else if (command === 'ban') {
            client.commands.get('ban').execute(client, Discord, message, args);
        } else if (command === 'kick') {
            client.commands.get('kick').execute(client, Discord, message, args);
        } else if (command === 'mute') {
            client.commands.get('mute').execute(client, Discord, message, args);
        } else if (command === 'tempmute') {
            client.commands.get('tempmute').execute(client, Discord, message, args, ms);
        } else if (command === 'clear') {
            client.commands.get('clear').execute(client, Discord, message, args);
        } else if (command === 'respond') {
            client.commands.get('report-resp').execute(client, Discord, message, args);
        } else if (command === 'unmute') {
            client.commands.get('unmute').execute(client, Discord, message, args);
        } else if (command === 'mod-help') {
            client.commands.get('mod-help').execute(client, Discord, message, args);
            
            // Alias handling. Probably not the most ethical way to do it, but.. it works!
        } else if (command === 'mh') {
            client.commands.get('mod-help').execute(client, Discord, message, args);
        }

    });


// Gets the token from the gitignore'd file ;)
const token = process.env.DISCORD_TOKEN

client.login(`${token}`)