const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = 'pcn!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
	const command = require (`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('PlagueCraft Network Discord Bot -- Ready to roll!');
	client.user.setActivity("the mods!", { type: "LISTENING"})
});

client.on('message', message =>{
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if(command === 'ping'){
		client.commands.get('ping').execute(message, args);
	} else if (command === 'kick'){
		client.commands.get('kick').execute(message, args);
	} else if (command === 'ban'){
		client.commands.get('ban').execute(message, args);
	} else if (command === 'mute'){
		client.commands.get('mute').execute(message, args);
	} else if (command === 'unmute'){
		client.commands.get('unmute').execute(message, args);
	} else if (command === 'help'){
		client.commands.get('help').execute(message, args);
	} else if (command === 'mod-help'){
		client.commands.get('mod-help').execute(message, args);
	} else if (command === 'ping'){
		client.commands.get('ping').execute(message, args);
	} else if (command === 'swlookup'){
		client.commands.get('swlookup').execute(message, args);
	} else if (command === 'econlookup'){
		client.commands.get('econlookup').execute(message, args);
	} else if (command === 'ip'){
		client.commands.get('ip').execute(message, args);
	} else if (command === 'clear'){
		client.commands.get('clear').execute(message, args);
	}
})

client.login('token-here')