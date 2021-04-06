module.exports = {
	name: 'ban',
	description: 'PCN Ban Command',
	execute(message, args, Discord, client) {
		if(message.member.roles.cache.some(r => r.name === "Mod Bot User")) {
			const member = message.mentions.users.first();

			if(!args.length) {
			return message.reply(`You need to specify a user to ban!`)
		}	
		
		if(member) {
			const memberTarget = message.guild.members.cache.get(member.id);

			const banEmbed = new Discord.MessageEmbed()
			.setTitle('Banned!')
			.setThumbnail('https://plaguecraft.xyz/assets/img/logo.png')
			.setDescription(`${message.author} has banned ${memberTarget}!`)
			.setColor('#c7002e')

			memberTarget.ban();
			message.channel.send(`${memberTarget} has been banned.`)
			console.log(`UID ${memberTarget} has been banned!`)
			const channel = client.channels.cache.find(channel => channel.name === "punishments")
				
				channel.send(banEmbed)

		} else {
			message.reply(`I couldn't ban that member!`)
		}

		} else {
			messages.reply('You do not have sufficient permissions to run this command.')
		}
	}
}