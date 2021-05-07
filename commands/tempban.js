module.exports = {
    name: 'tempban',
    execute(client, Discord, message, args, ms) {
        const target = message.mentions.users.first(); // Get the mentioned user
        
        if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")){ // Returns a message if the user is not a mod
            return message.channel.send('You do not have the permissions to run this command!')
                    }

        if(!args[0]) { // User check
            return message.reply(`you need to specify a user to ban!`)
                    } 
        
        if (target === message.author) { // Makes sure the user isn't the same as the message author
            return message.reply(`you can't tempban yourself!`)
                    }
            
			if(!args[1]) { // Time check
				return message.reply(`you need to specify a time to ban this user for!`)
			}

            if(!args[2]) {
                return message.reply(`you need to specify why you're banning this user!`)
            }

			if(target) {

                const reason = args.slice(2).join(' ');
 
            let memberTarget = message.guild.members.cache.get(target.id); // Get mentioned users UID

            memberTarget.ban(); // Add the muted role
            message.channel.send(`${memberTarget} has been tempbanned for ${ms(ms(args[1]))}`); // Log the mute
            console.log(`UID ${memberTarget} has been tempbanned for ${ms(ms(args[1]))}\nReason: ${reason}`) // Console log the mute
            const banTimedEmbed = new Discord.MessageEmbed() // Create and send an embed

            .setTitle('Banned!')
            .setThumbnail('https://plaguecraft.xyz/storage/assets/img/logo.png')
            .setDescription(`${message.author} has tempbanned ${memberTarget} for ${ms(ms(args[1]))}!\n**Reason: ${reason}**`)
            .setColor('#c7002e')
            .setFooter(`PCN Bans`)
            .setTimestamp();

            const channel = client.channels.cache.find(channel => channel.name === "📞bot-notifications📞") // Define Channel
            channel.send(banTimedEmbed) // Send the embed to channel
 
            setTimeout(function () {
                message.guild.members.unban(memberTarget.id); // Removes the role when time is up.
            }, ms(args[1]));
        }
    }
}