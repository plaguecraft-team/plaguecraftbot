module.exports = {
	name: 'tempmute',
	description: "Tempmute command for timed mutes",
	execute(message, args, Discord, client, ms) {

		if(message.member.roles.cache.some(r => r.name === "Mod Bot User")){
			const target = message.mentions.users.first();

			if(!args[0]) {
				return message.reply(`you need to specify a user!`)
			}

			if(!args[1]) {
				return message.reply(`you need to specify a time to mute this user for!`)
			}

			if(target) {
			let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
 
            let memberTarget = message.guild.members.cache.get(target.id);

            memberTarget.roles.add(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);
            console.log(`UID ${memberTarget} has been muted for ${ms(ms(args[1]))}`)
            const muteTimedEmbed = new Discord.MessageEmbed()

            .setTitle('Muted!')
            .setThumbnail('https://plaguecraft.xyz/assets/img/logo.png')
            .setDescription(`${message.author} has muted ${memberTarget} for ${ms(ms(args[1]))}!`)
            .setColor('#c7002e')
            .setFooter(`PCN Mutes`)
            .setTimestamp();

            const channel = client.channels.cache.find(channel => channel.name === "punishments")
            channel.send(muteTimedEmbed)

            const notitimedchannel = client.channels.cache.find(channel => channel.name === "muted-notifications")
            notitimedchannel.send(`Hey ${memberTarget}, you were muted for ${ms(ms(args[1]))}.\nIf you'd like to appeal, please follow the steps listed in the **muted-users** channel.`)
 
            setTimeout(function () {
                memberTarget.roles.remove(muteRole.id);
            }, ms(args[1]));
			}


		}
	}
}