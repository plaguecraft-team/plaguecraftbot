module.exports = {
	name: 'kick',
	description: "PCN Kick Command",
	execute(message, args) {

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
		} else {
			message.channel.send(`That user could not be kicked from the server!`)
		} 

		} else {
			message.reply('You do not have sufficient permissions to use this command.')
		}
	}
}