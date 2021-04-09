module.exports = {
	name: 'ban',
	description: 'PCN Ban Command',
	execute(message, args, Discord, client) {
		if(message.member.roles.cache.some(r => r.name === "Mod Bot User")) {
			const member = message.mentions.users.first();

			if(!args[0]) {
			return message.reply(`you need to specify a user to ban!`)
		}	

			if(!args[1]) {
			return message.reply(`you need to specify why you're banning this user!`)
		}
		
		if(member) {
			const reason = args.slice(1).join(' ');
			const memberTarget = message.guild.members.cache.get(member.id);
			message.delete();

			const banEmbed = new Discord.MessageEmbed()
			.setTitle('Banned!')
			.setThumbnail('https://plaguecraft.xyz/assets/img/logo.png')
			.setDescription(`${message.author} has banned ${memberTarget}!\n\n Reason: "${reason}"`)
			.setColor('#c7002e')
			.setFooter(`PCN Bans`)
			.setTimestamp();

			memberTarget.ban();
			message.channel.send(`${memberTarget} has been banned.`)
			console.log(`UID ${memberTarget} has been banned! Reason: "${reason}"`)
			const channel = client.channels.cache.find(channel => channel.name === "punishments")
				
				channel.send(banEmbed)

		} else {
			message.reply(`I couldn't ban that member!`)
		}

		} else {
			message.reply('You do not have sufficient permissions to run this command.')
		}
	}
}