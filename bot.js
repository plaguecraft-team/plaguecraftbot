// The PlagueCraft Network Discord Bot
// This project is liscensed under the MIT Open-Source License (https://opensource.org/licenses/mit)

// Copyright (c) 2021 The PlagueCraft Network
// Read the LICENSE file to learn more about the MIT Licenses

// Calling all packages needed for this project
const Discord = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');
const ms = require('ms');
const minecraftPlayer = require('minecraft-player');

// Require dotenv to hide token on Git lol
require('dotenv').config();

// Set prefix
const prefix = 'pcn!';

// Create the bot client
const client = new Discord.Client();

// Prepare the command handlers
client.commands = new Discord.Collection();
client.moderation = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/general').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/general/${file}`);
 
    client.commands.set(command.name, command);
}

const modFiles = fs.readdirSync('./commands/moderation').filter(file => file.endsWith('.js'));
for(const file of modFiles){
    const command = require(`./commands/moderation/${file}`);
 
    client.moderation.set(command.name, command);
}

    client.once('ready', () => {
        console.log('The PlagueCraft Discord Bot has now come online! Fear me mortals!');
        client.user.setPresence({
            status: 'dnd',
            activity: {
                name: 'pcn!help',
                type: 'WATCHING',
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            }
        })
    });

    client.on('guildMemberAdd', async member => {
        const channel = member.guild.channels.cache.get('840335580730621982');
        if (!channel) return;
    
        const joinEmbed = new Discord.MessageEmbed()
        .setTitle(`User joined!`)
        .setDescription(`Welcome ${member} to the server!`)
        .setThumbnail(`https://plaguecraft.xyz/storage/assets/img/logo.png`)
        .setColor(`#c7002e`)
        .setFooter('PCN')
        .setTimestamp();

        channel.send(joinEmbed)
    });

    client.on('messageBulkDelete', async message => {
        if(!message.guild) return;
        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_BULK_DELETE',
        });

        const deletionLog = fetchedLogs.entries.first();

        if(!deletionLog) return console.log(`A message by ${message.author.tag} was removed, but no relevant audit logs were found.`)

        const { executer, target } = deletionLog;

        if(target.id === message.author.id) {
            console.log(`A message by ${message.author.username} was deleted by ${executer.tag}.`)
        } else {
            console.log(`A message by ${message.author.tag} was deleted, however there is no person tied to it.`)
        }
    })
     
    client.on('message', async message =>{
        if(!message.content.startsWith(prefix) || message.author.bot) return;
     
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        process.on('unhandledRejection', error => {
            console.error('Unhandled promise rejection:', error);
        });
     
        // General Commands
        if(command === 'help'){
            client.commands.get('help').execute(client, Discord, message, args);
        } else if (command === 'ping') {
            client.commands.get('ping').execute(client, Discord, message, args);
        } else if (command === 'suggest') {
            client.commands.get('suggest').execute(client, Discord, message, args);
        } else if (command === 'support') {
            client.commands.get('support').execute(client, Discord, message, args);
        } else if (command === 'ticket') {
            client.commands.get('ticket').execute(client, Discord, message, args);
        } else if (command === 'aticket') {
            client.moderation.get('aticket').execute(client, Discord, message, args, client);
        } else if (command === 'areply') {
            if(!message.member.roles.cache.some(r => r.name === "awex")){
                return message.channel.send('You do not have the permissions to run this command!')
            }
            if (!args[0]) {
                return message.channel.send(`You didn't include a subject for the ticket.`)
            }
            let messageArgs = args.join(' ');
            var params = {
                username: "PCN ATicket",
                avatar_url: "https://plaguecraft.xyz/storage/assets/img/logo.png",
                content: `Awex has responded to a ticket!`,
                embeds: [
                    {
                        "title": "Awex's Response",
                        "thumbnail": {
                            "url": "https://plaguecraft.xyz/storage/assets/img/logo.png",
                        },
                        "description": `${messageArgs}`
                    }
                ]
            }

            fetch('https://discord.com/api/webhooks/850765040243310592/SxHQ2W0y0Z1SJn9aKfgDWSLlIrRRy0w_tXGKJkTWGq9lIYOl9p3JsM2bCmkE2RjrBJBW', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(params)
            }).then(res => {
                console.log(res);
            }) 

            return message.channel.send('Sent.')
        } else if (command === 'ip') {
            client.commands.get('ip').execute(client, Discord, message, args);
        } else if (command === 'report') {
            client.moderation.get('report').execute(client, Discord, message, args);
        } else if (command === 'playerreport') {
            client.commands.get('playerreport').execute(Discord, client, message, args, minecraftPlayer);
        } else if (command === 'status') {
            client.commands.get('status').execute(client, Discord, message, args, fetch);
        } else if (command === 'announce') {
            client.commands.get('announce').execute(client, Discord, message, args, ms);
        } else if (command === 'bug') {
            client.commands.get('bug').execute(client, Discord, message, args);
        } else if (command === 'clips') {
            client.commands.get('clips').execute(client, Discord, message, args, fetch);
            // Moderation
        } else if (command === 'ban') {
            client.moderation.get('ban').execute(client, Discord, message, args);
        } else if (command === 'kick') {
            client.moderation.get('kick').execute(client, Discord, message, args);
        } else if (command === 'mute') {
            client.moderation.get('mute').execute(client, Discord, message, args);
        } else if (command === 'tempmute') {
            client.moderation.get('tempmute').execute(client, Discord, message, args, ms);
        } else if (command === 'clear') {
            client.moderation.get('clear').execute(client, Discord, message, args);
        } else if (command === 'unmute') {
            client.moderation.get('unmute').execute(client, Discord, message, args);
        } else if (command === 'mod-help') {
            client.moderation.get('mod-help').execute(client, Discord, message, args);
        } else if (command === 'tempban') {
            client.moderation.get('tempban').execute(client, Discord, message, args, ms);
        } else if (command === 'unban') {
            client.moderation.get('unban').execute(client, Discord, message, args);
            // Alias handling. Probably not the most ethical way to do it, but.. it works!
        } else if (command === 'mh') {
            client.moderation.get('mod-help').execute(client, Discord, message, args);
        }

    });


// Gets the token from the gitignore'd file ;)
const token = process.env.DISCORD_TOKEN

client.login(`${token}`)