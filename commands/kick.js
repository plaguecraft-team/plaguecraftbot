module.exports = {
	name: 'kick',
	description: "PCN Kick Command",
	execute(client, message, args, Discord) {

		const member = message.mentions.users.first();

		if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")){
			return message.channel.send('You do not have the permissions to run this command!')
		}

		if (member === message.author) {
			return message.channel.send(`You can't kick yourself, ${message.author}!`)
		}

		if(!args[0]) {
			return message.reply('you need to specify a user to kick!')
		}

		if (message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("KICK_MEMBERS")) {
			return message.channel.send(`${member} is too high in the role hierarchy to kick!`)
		}

		if(!args[1]) {
			return message.reply(`you need to specify why you're banning this user!`)
		}

		if(member) {
			const reason = args.slice(1).join(' ');
			const memberTarget = message.guild.members.cache.get(member.id);
			memberTarget.kick();
			console.log(`User ${memberTarget} has been kicked for ${reason}`)

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
	}
}