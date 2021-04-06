module.exports = {
	name: 'ban',
	description: 'PCN Ban Command',
	execute(message, args) {
		if(message.member.roles.cache.some(r => r.name === "Mod Bot User")) {
			const member = message.mentions.users.first();

			if(!args.length) {
			return message.reply(`You need to specify a user to ban!`)
		}	
		
		if(member) {
			const memberTarget = message.guild.members.cache.get(member.id);
			memberTarget.ban();
			message.channel.send(`${memberTarget} has been banned.`)
			console.log(`UID ${memberTarget} has been banned!`)
		} else {
			message.reply(`I couldn't ban that member!`)
		}

		} else {
			messages.reply('You do not have sufficient permissions to run this command.')
		}
	}
}