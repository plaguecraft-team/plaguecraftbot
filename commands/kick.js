module.exports = {
	name: 'kick',
	description: "PCN Kick Command",
	execute(message, args, Discord, client) {

		if(message.member.roles.cache.some(r => r.name === "Mod Bot User")) {
			const member = message.mentions.users.first();

			if(!args[0]) {
				return message.reply('you need to specify a user to kick!')
			}

			if(!args[1]) {
				return message.reply(`you need to specify why you're banning this user!`)
			}

		if(member) {
			const reason = args.slice(1).join(' ');
			const memberTarget = message.guild.members.cache.get(member.id);
			memberTarget.kick();
			console.log(`UID ${memberTarget} has been kicked!`)

			const kickEmbed = new Discord.MessageEmbed()
			.setTitle('Kicked!')
			.setThumbnail('https://plaguecraft.xyz/assets/img/logo.png')
			.setDescription(`${message.author} has kicked ${memberTarget}!\n\nReason: "${reason}"`)
			.setColor('#c7002e')
			.setFooter(`PCN Kicks`)
			.setTimestamp();

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