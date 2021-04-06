module.exports = {
	name: 'kick',
	description: "PCN Kick Command",
	execute(message, args, Discord, client) {

		if(message.member.roles.cache.some(r => r.name === "Mod Bot User")) {
			const member = message.mentions.users.first();

			if(!args.length) {
				return message.reply('You need to specify a user to kick!')
			}

		if(member) {
			const memberTarget = message.guild.members.cache.get(member.id);
			memberTarget.kick();
			message.channel.send(`${memberTarget} has been kicked from the server.`)
			console.log(`UID ${memberTarget} has been kicked!`)

			const kickEmbed = new Discord.MessageEmbed()
			.setTitle('Banned!')
			.setThumbnail('https://plaguecraft.xyz/assets/img/logo.png')
			.setDescription(`${message.author} has kicked ${memberTarget}!`)
			.setColor('#c7002e')

			const channel = client.channels.cache.find(channel => channel.name === "punishments")

			channel.send(kickEmbed);


		} else {
			message.channel.send(`That user could not be kicked from the server!`)
		} 

		} else {
			message.reply('You do not have sufficient permissions to use this command.')
		}
	}
}