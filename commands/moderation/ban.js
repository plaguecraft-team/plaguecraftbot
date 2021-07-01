module.exports = {
    name: 'ban',
    async execute(client, Discord, message, args, ms) {
        const member = message.mentions.users.first();

        if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")) {
            return message.channel.send(`You don't have the correct permissions to run this command.`)
        } else if (!args[0]) {
            return message.channel.send(`You need to specify who you want to ban.`)
        } else if (member === message.author) {
            return message.channel.send(`You can't ban yourself!`)
        } else if (!args[1]) {
            return message.channel.send(`You need to give a reason for banning this user.`)
        }

        if(member) {
            try {
                    const reason = args.slice(1).join(' ');
                    const memberTarget = message.guild.members.cache.get(member.id);

                    const banEmbed = new Discord.MessageEmbed()
					.setTitle('Banned!')
					.setThumbnail('https://plaguecraft.xyz/storage/assets/img/logo.png')
					.setDescription(`${message.author} has banned ${memberTarget}!\n\n Reason: "${reason}"`)
					.setColor('#c7002e')
					.setFooter(`PCN Bans`)
					.setTimestamp();

					memberTarget.ban();
					message.react('✔️')
					console.log(`User ${memberTarget} has been banned! Reason: "${reason}"`)
					const channel = client.channels.cache.find(channel => channel.id === "855670611094667264")
                    channel.send(banEmbed)
                }
                catch (err) {
                    console.log('Oh no! There was an error running the Ban command:', err)
                    return message.channel.send(`I couldn't ban ${member.username} due to an internal error. Please contact a team member.`)
                }
            } else if (!member) {
                try {
                    const reason = args.slice(1).join(' ');
                    const memberTarget = message.guild.members.cache.get(member.id);

                    const banEmbed = new Discord.MessageEmbed()
					.setTitle('Banned!')
					.setThumbnail('https://plaguecraft.xyz/storage/assets/img/logo.png')
					.setDescription(`${message.author} has banned ${memberTarget}!\n\n Reason: "${reason}"`)
					.setColor('#c7002e')
					.setFooter(`PCN Bans`)
					.setTimestamp();

					memberTarget.ban();
					message.react('✔️')
					console.log(`User ${memberTarget} has been banned! Reason: "${reason}"`)
					const channel = client.channels.cache.find(channel => channel.id === "855670611094667264")
                    channel.send(banEmbed)
                }
                catch (err) {
                    console.log(err)
                }
            }
        }
    }