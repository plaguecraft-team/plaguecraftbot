// The PlagueCraft Network Discord Bot
// This project is liscensed under the MIT Open-Source License (https://opensource.org/licenses/mit)

// Copyright (c) 2021 The PlagueCraft Network
// Read the LICENSE file to learn more about the MIT Licenses

// Calling all packages needed for this project
const Discord = require('discord.js');
const { Client, Intents} = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');
const ms = require('ms');
const minecraftPlayer = require('minecraft-player');
const math = require('mathjs');

// Require dotenv to hide token on Git lol
require('dotenv').config();

// Set prefix
const prefix = 'pcn!';

// Create the bot client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Prepare the command handlers
client.commands = new Discord.Collection();
client.moderation = new Discord.Collection();
client.econ = new Discord.Collection();

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

// const econFiles = fs.readdirSync('./commands/economy').filter(file => file.endsWith('.js'));
// for(const file of econFiles){
//     const command = require(`./commands/economy/${file}`);
 
//     client.econ.set(command.name, command);
// }

    client.once('ready', async () => {
        console.log('The PlagueCraft Discord Bot has now come online! Fear me mortals!');
        client.user.setActivity("pcn!help");
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

        client.on('messageDeleteBulk', async messages => {
            const length = messages.array().length;
            const channel = messages.first().channel.name;
            console.log(`${length} messages were purged:`, messages.map(message => `[${message.author.tag}]: ${message.content}`))
          
            const embed = new Discord.MessageEmbed()
              .setTitle(`${length} Messages purged in #${channel}`)
              .setDescription(messages.map(message => `[${message.author.tag}]: ${message.content}`))
              .setFooter(`${length} latest shown`)
              .setColor('#c7002e')
              .setTimestamp();
          
            (await client.channels.fetch(`840640152179048449`)).send(embed);
          });
     
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
            client.moderation.get('aticket').execute(client, Discord, message, args);
        } else if (command === 'areply') {
            client.moderation.get('areply').execute(client, Discord, message, args);
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
        } else if (command === 'invite') {
            return message.channel.send(`https://plaguecraft.xyz/discord`)
            // Moderation
        } else if (command === 'ban') {
            client.moderation.get('ban').execute(client, Discord, message, args);
        } else if (command === 'kick') {
            client.moderation.get('kick').execute(client, Discord, message, args);
        } else if (command === 'mute') {
            client.moderation.get('mute').execute(client, Discord, message, args);
        } else if (command === 'temp') {
            client.moderation.get('temp').execute(client, Discord, message, args, ms);
        } else if (command === 'clear') {
            client.moderation.get('clear').execute(client, Discord, message, args);
        } else if (command === 'unmute') {
            client.moderation.get('unmute').execute(client, Discord, message, args);
        } else if (command === 'mod-help') {
            client.moderation.get('mod-help').execute(client, Discord, message, args);
        // } else if (command === 'unban') {
        //     client.moderation.get('unban').execute(client, Discord, message, args);
        // Economy
        // } else if (command === 'balance') {
        //     client.econ.get('balance').execute(client, Discord, message, args, fetch);
        // } else if (command === 'give') {
        //     client.econ.get('give').execute(client, Discord, message, args, fetch, math);
        // } else if (command === 'register') {
        //     client.econ.get('register').execute(client, Discord, message, args, fetch);
        // } else if (command === 'store') {
        //     client.econ.get('store').execute(client, Discord, message, args, fetch)
        // } else if (command === 'buy') {
        //     client.econ.get('buy').execute(client, Discord, message, args, fetch, math);
            // Alias handling. Probably not the most ethical way to do it, but.. it works!
        } else if (command === 'mh') {
            client.moderation.get('mod-help').execute(client, Discord, message, args);
        }

    });


// Gets the token from the gitignore'd file ;)
const token = process.env.DISCORD_TOKEN

client.login(`${token}`)