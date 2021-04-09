module.exports = {
	name: 'report-resp',
	description: 'Gives mods the ability to DM users via the bot',
	execute(message, args, Discord, client) {
		if(message.member.roles.cache.some(r => r.name === "Mod Bot User")){
       
			if(!args.length) {
				return message.reply(`you need to specify a user to dm!`)
			}

			const resp = args.slice(1).join(' ');

        const target = message.mentions.users.first();

        target.send(`Hey ${target}, the PlagueCraft Moderation Team has responded to your case!\n--\n${resp}`)

        message.reply(`Sent your DM to ${target}!`)

    	} else{
    		return message.reply(`You do not have sufficient permissions to use this command.`)
    	}
	}
}