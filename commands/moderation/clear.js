// This module was contributed by RandomMafia11.

module.exports = {
	name: 'purge',
	description: 'PCN Purge Command',
	async execute(client, Discord, message, args, color, thumb) {
        if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")){
			return message.channel.send('You do not have the permissions to run this command!')
		}

        if(!args[0]) {
            const synEmbed = new Discord.MessageEmbed()
            .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
            .setTitle(`pcn!purge`)
            .setColor(color)
            .addFields(
                { name: 'Description', value: 'Purges x amount of messages in the current channel (14 days or younger, less than 100).'},
                { name: 'Syntax', value: 'pcn!purge [messages-to-clear-num]' },
                { name: 'Missing Field', value: 'No number supplied'}
            )

            return message.channel.send(synEmbed)
        }
        if(isNaN(args[0])) {
            const synEmbed = new Discord.MessageEmbed()
            .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
            .setTitle(`pcn!purge`)
            .setColor(color)
            .addFields(
                { name: 'Description', value: 'Purges x amount of messages in the current channel (14 days or younger, less than 100).'},
                { name: 'Syntax', value: 'pcn!purge [messages-to-clear-num]' },
                { name: 'Missing Field', value: `Amount isNaN`}
            )

            return message.channel.send(synEmbed)
        }

        if(args[0] > 100) {
            const synEmbed = new Discord.MessageEmbed()
            .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
            .setTitle(`pcn!purge`)
            .setColor(color)
            .addFields(
                { name: 'Description', value: 'Purges x amount of messages in the current channel (14 days or younger, less than 100).'},
                { name: 'Syntax', value: 'pcn!purge [messages-to-clear-num]' },
                { name: 'Missing Field', value: 'More than 100'}
            )

            return message.channel.send(synEmbed)
        }
        if(args[0] < 1) {
            const synEmbed = new Discord.MessageEmbed()
            .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
            .setTitle(`pcn!purge`)
            .setColor(color)
            .addFields(
                { name: 'Description', value: 'Purges x amount of messages in the current channel (14 days or younger, less than 100).'},
                { name: 'Syntax', value: 'pcn!purge [messages-to-clear-num]' },
                { name: 'Missing Field', value: 'Less than 1'}
            )

            return message.channel.send(synEmbed)
        }

        message.delete();

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            // console.log(messages);
            message.channel.bulkDelete(messages).catch(console.error)

        }) 
	}
}