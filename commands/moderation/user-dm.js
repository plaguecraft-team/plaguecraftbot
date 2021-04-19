module.exports = {
	name: 'report-resp',
	description: 'Gives mods the ability to DM users via the bot',
	execute(client, message, args, Discord) {
		
		if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")){
			return message.channel.send('You do not have the permissions to run this command!')
		}
       
			if(!args.length) {
				return message.reply(`you need to specify a user to dm!`)
			}

			const resp = args.slice(1).join(' ');

        const target = message.mentions.users.first();

        target.send(`Hey ${target}, the PlagueCraft Moderation Team has responded to your case!\n--\n${resp}`)

        message.reply(`Sent your DM to ${target}!`)
	}
}