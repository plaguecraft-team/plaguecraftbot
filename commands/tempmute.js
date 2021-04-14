module.exports = {
	name: 'tempmute',
	description: "Tempmute command for timed mutes",
	execute(message, args, Discord, client, ms) {

		if(message.member.roles.cache.some(r => r.name === "Mod Bot User")){ // Makes sure the user is a mod
			const target = message.mentions.users.first(); // Get the mentioned user

			if(!args[0]) {
				return message.reply(`you need to specify a user!`)
			} // User check

			if(!args[1]) { // Time check
				return message.reply(`you need to specify a time to mute this user for!`)
			}

			if(target) {
			let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted'); // Define the Muted role
 
            let memberTarget = message.guild.members.cache.get(target.id); // Get mentioned users UID

            memberTarget.roles.add(muteRole.id); // Add the muted role
            message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`); // Log the mute
            console.log(`UID ${memberTarget} has been muted for ${ms(ms(args[1]))}`) // Console log the mute
            const muteTimedEmbed = new Discord.MessageEmbed() // Create and send an embed

            .setTitle('Muted!')
            .setThumbnail('https://plaguecraft.xyz/assets/img/logo.png')
            .setDescription(`${message.author} has muted ${memberTarget} for ${ms(ms(args[1]))}!`)
            .setColor('#c7002e')
            .setFooter(`PCN Mutes`)
            .setTimestamp();

            const channel = client.channels.cache.find(channel => channel.name === "punishments") // Define Channel
            channel.send(muteTimedEmbed) // Send the embed to channel

            const notitimedchannel = client.channels.cache.find(channel => channel.name === "muted-notifications") // Get the notification channel
            notitimedchannel.send(`Hey ${memberTarget}, you were muted for ${ms(ms(args[1]))}.\nIf you'd like to appeal, please follow the steps listed in the **muted-users** channel.`) // Send the user a DM
 
            setTimeout(function () {
                memberTarget.roles.remove(muteRole.id); // Removes the role when time is up.
            }, ms(args[1]));
			}
		}
	}
}