module.exports = {
    name: 'kick',
    execute (client, Discord, message, args) {
        const member = message.mentions.users.first();

		if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")){
			return message.channel.send('You do not have the permissions to run this command!')
		} else if (member === message.author) {
            return message.channel.send(`You can't kick yourself, ${message.author}!`)
        } else if(!args[0]) {
            return message.reply('you need to specify a user to kick!')
        } else if (!args[1]) {
            return message.reply(`you need to specify why you're banning this user!`)
        }

        if (member) {
            const reason = args.slice(1).join(' ');
            const member = message.guild.members.cache.get(member.id)
            try {
            memberTarget.kick();
			message.react('✔️')
            console.log(`User ${memberTarget.username} was kicked by ${message.author.username} for ${reason}`)
        }
        catch (err) {
            console.log(`User ${memberTarget} could not be kicked:`, err)
        }

            const kickEmbed = new Discord.MessageEmbed()
			.setTitle('Kicked!')
			.setThumbnail('https://plaguecraft.xyz/storage/assets/img/logo.png')
			.setDescription(`${message.author} has kicked ${memberTarget}!\n\nReason: "${reason}"`)
			.setColor('#c7002e')
			.setFooter(`PCN Kicks`)
			.setTimestamp();

			const channel = client.channels.cache.find(channel => channel.id === "856717402447675392")

			channel.send(kickEmbed);
        }
    } 
}