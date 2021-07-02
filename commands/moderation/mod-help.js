module.exports = {
	name:'mod-help',
	description: "PCN mod-help command",
	execute(client, Discord, message, args, color, thumb) {
		
        if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")){
			return message.channel.send('You do not have the permissions to run this command!')
		}

		const modEmbed = new Discord.MessageEmbed()
		.setColor(color)
		.setTitle('PlagueCraftBot Moderation Help')
		.setAuthor('The PlagueCraft Network', `${thumb}`, `https://plaguecraft.xyz`)
		.setDescription('As a moderator, your job is to keep the bad guys out, and help around the community.\n\nSome of these commands are public and can be used by anyone, but some are punishments that can be handed by you.\n\n **Make sure these are logical punishments.**')
		.addFields(
			{ name: '`ban`', value: 'Ban a user.\npcn!ban [user] [reason]' },
			{ name: '`temp`', value: `Temp mute/ban a user.\npcn!temp [mute/ban] [duration] [reason]` },
			{ name: '`purge`', value: 'Purges x amount of messages.\npcn!purge [amount]' },
			{ name: '`mute`', value: 'Indefinitely mutes a user.\npcn!mute [user]' },
			{ name: '`unmute`', value: 'Unmutes a muted user.\npcn!unmute [user]'}
		)
		.setTimestamp()

		message.reply(modEmbed)

	}
}