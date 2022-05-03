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

client.login(tokens[env])

// // Create the bot client & Initilize button support
// const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// // Prepare the command handlers
// client.commands = new Discord.Collection();
// client.moderation = new Discord.Collection();
// client.help = new Discord.Collection();

// const commandFiles = fs.readdirSync('./commands/general').filter(file => file.endsWith('.js'));
// for(const file of commandFiles){
//     const command = require(`./commands/general/${file}`);
 
//     client.commands.set(command.name, command);
// }

// const modFiles = fs.readdirSync('./commands/moderation').filter(file => file.endsWith('.js'));
// for(const file of modFiles){
//     const command = require(`./commands/moderation/${file}`);
 
//     client.moderation.set(command.name, command);
// }

// const helpFiles = fs.readdirSync('./commands/help').filter(file => file.endsWith('.js'));
// for(const file of helpFiles){
//     const command = require(`./commands/help/${file}`);
 
//     client.help.set(command.name, command);
// }

//     client.once('ready', async () => {
        // console.log('The PlagueCraft Discord Bot has now come online! Fear me mortals!');
        // client.user.setActivity("pcn!help");
//     });

//     client.on('guildMemberAdd', async member => {
//         const channel = member.guild.channels.cache.get(process.env.joinLog);
//         if (!channel) return;
    
//         const joinEmbed = new Discord.MessageEmbed()
//         .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz/`)
//         .setTitle(`User joined!`)
//         .setDescription(`Welcome ${member} to the server!`)
//         .setColor(color)
//         .setTimestamp();

//         channel.send(joinEmbed)
//     });

//         client.on('messageDeleteBulk', async messages => {
//             const length = messages.array().length;
//             const channel = messages.first().channel.name;
//             console.log(`${length} messages were purged:`, messages.map(message => `[${message.author.tag}]: ${message.content}`))
          
//             const embed = new Discord.MessageEmbed()
//               .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
//               .setTitle(`${length} Messages purged in #${channel}`)
//               .setDescription(messages.map(message => `[${message.author.tag}]: ${message.content}`))
//               .setFooter(`${length} latest shown`)
//               .setColor(color)
//               .setTimestamp();
          
//             (await client.channels.fetch(process.env.messageLog)).send(embed);
//           });
     
//     // client.on('message', async message =>{
//     //     if(!message.content.startsWith(prefix) || message.author.bot) return;
     
//     //     const args = message.content.slice(prefix.length).split(/ +/);
//     //     const command = args.shift().toLowerCase();

//     //     process.on('unhandledRejection', error => {
//     //         console.error('Unhandled promise rejection:', error);

//     //         fetch(process.env.errWebUrl, {
//     //             method: 'POST',
//     //             headers: {
//     //                 'Content-Type': 'application/json',
//     //             },
//     //             body: JSON.stringify({
//     //                 username: 'PlagueCraftBot - Errors',
//     //                 avatar_url: 'https://plaguecraft.xyz/storage/assets/img/logo-blue.jpg',
//     //                 content: `**There's been an error in the bot!**\nCommand that errored out: pcn!${command}\n\n${error}`
//     //             })
//     //         })
//     //     });
     
//     //     // Help Commands
//     //     if(command === 'help'){
//     //         client.help.get('help').execute(client, Discord, message, args, color, thumb);
//     //     } else if (message.content === 'pcn!') {
//     //         return message.channel.send('Hey! Thanks for coming :)\nRun **pcn!help** for more info!')
//     //     } else if (command === 'ping') {
//     //         client.commands.get('ping').execute(client, Discord, message, args);
//     //     } else if (command === 'suggest') {
//     //         client.commands.get('suggest').execute(client, Discord, message, args, color);
//     //     } else if (command === 'ticket') {
//     //         client.commands.get('ticket').execute(client, Discord, message, args);
//     //     } else if (command === 'ip') {
//     //         client.commands.get('ip').execute(client, Discord, message, args);
//     //     } else if (command === 'report') {
//     //         client.moderation.get('report').execute(client, Discord, message, args, color, thumb);
//     //     } else if (command === 'playerreport') {
//     //         client.commands.get('playerreport').execute(Discord, client, message, args, minecraftPlayer, color, thumb);
//     //     } else if (command === 'status') {
//     //         client.commands.get('status').execute(client, Discord, message, args, fetch, color, thumb);
//     //     } else if (command === 'announce') {
//     //         client.commands.get('announce').execute(client, Discord, message, args, ms);
//     //     } else if (command === 'bug') {
//     //         client.commands.get('bug').execute(client, Discord, message, args, color, thumb);
//     //     } else if (command === 'invite') {
//     //         return message.channel.send(`https://dsc.gg/pcn`)
//     //         // Moderation
//     //     } else if (command === 'ban') {
//     //         client.moderation.get('ban').execute(client, Discord, message, args, color, thumb);
//     //     } else if (command === 'kick') {
//     //         client.moderation.get('kick').execute(client, Discord, message, args, color, thumb);
//     //     } else if (command === 'mute') {
//     //         client.moderation.get('mute').execute(client, Discord, message, args, color, thumb);
//     //     } else if (command === 'temp') {
//     //         client.moderation.get('temp').execute(client, Discord, message, args, ms, color, thumb);
//     //     } else if (command === 'purge') {
//     //         client.moderation.get('purge').execute(client, Discord, message, args, color, thumb);
//     //     } else if (command === 'unmute') {
//     //         client.moderation.get('unmute').execute(client, Discord, message, args, color, thumb);
//     //     } else if (command === 'mod-help') {
//     //         client.moderation.get('mod-help').execute(client, Discord, message, args, color, thumb);
//     //     } else if (command === 'unban') {
//     //         client.moderation.get('unban').execute(client, Discord, message, args);
//     //     } else if (command === 'modme') {
//     //         client.moderation.get('modme').execute(client, Discord, message, args, util, color, thumb);
//     //     } else if (command === 'opme') {
//     //         client.moderation.get('opme').execute(client, Discord, message, args, util, color, thumb);
//     //         // Alias handling. Probably not the most ethical way to do it, but.. it works!
//     //     } else if (command === 'mh') {
//     //         client.moderation.get('mod-help').execute(client, Discord, message, args, color, thumb);
//     //     } else {
//     //         const notfound = new Discord.MessageEmbed()
//     //         .setColor(color)
//     //         .setAuthor(`The PlagueCraft Network`, `${thumb}`, 'https://plaguecraft.xyz')
//     //         .setTitle(`Sorry, that's not a command.`)
//     //         .setDescription(`Make sure you've typed it correctly. \nRun the **pcn!help** command to learn more.`)
//     //         .setTimestamp();

//     //         return message.channel.send(notfound);
//     //     }

//     // });

// client.login(token)