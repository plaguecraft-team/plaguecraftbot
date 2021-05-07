module.exports = {
	name: 'ban',
	description: 'PCN Ban Command',
	async execute(client, Discord, message, args) {

		const member = message.mentions.users.first();

		if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")){
			return message.channel.send('You do not have the permissions to run this command!')
		}

		if(!args[0]) {
			return message.reply(`you need to specify a user to ban!`)
		}

		if (member === message.author) {
			return message.channel.send(`You can't ban yourself, ${message.author}!`)
		}

			if(!args[1]) {
			return message.reply(`you need to specify why you're banning this user!`)
		}

		if(member) {

			try {
                const banList = await message.guild.fetchBans();
              
                const bannedUser = banList.find(user => user.id === `${memberTarget}`);
              
                if (bannedUser) {
					return await message.channel.send(`That user is already banned.`);
                }
                else if (!bannedUser){
                    const reason = args.slice(1).join(' ');
					const memberTarget = message.guild.members.cache.get(member.id);
					message.delete();

					const banEmbed = new Discord.MessageEmbed()
					.setTitle('Banned!')
					.setThumbnail('https://plaguecraft.xyz/storage/assets/img/logo.png')
					.setDescription(`${message.author} has banned ${memberTarget}!\n\n Reason: "${reason}"`)
					.setColor('#c7002e')
					.setFooter(`PCN Bans`)
					.setTimestamp();

					memberTarget.ban();
					message.channel.send(`${memberTarget} has been banned.`)
					console.log(`UID ${memberTarget} has been banned! Reason: "${reason}"`)
					const channel = client.channels.cache.find(channel => channel.name === "📞bot-notifications📞")
						
						channel.send(banEmbed)
                }
              } catch(err) {
                console.error(err);
              }
		}
	}
}