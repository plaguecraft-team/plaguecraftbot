module.exports = {
    name: 'unban',
    async execute(client, Discord, message, args) {
        const id = args[0]

        if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")){
            return message.channel.send('You do not have the permissions to run this command!')
        } else if (!args.length) {
            return message.reply(`You didn't specify a user to unban!`);
        } else if (id === message.author.id) {
            return message.channel.send(`How are you expecting to unban yourself when you can't even ban yourself in the first place?`)
        }

        if(args[0]) {

            try {
                console.log(`UID ${id} has been unbanned!`)  
                message.guild.members.unban(id)
                
                // const channel = client.channels.cache.find(channel => channel.name === "📞bot-notifications📞")
                const channel = client.channels.cache.find(channel => channel.name === "stuff")
    
                const unbanEmbed = new Discord.MessageEmbed()
                
                .setTitle('Unbanned!')
                .setThumbnail('https://plaguecraft.xyz/storage/assets/img/logo.png')
                .setDescription(`${message.author} has unbanned ID ${id}!`)
                .setColor('#03fc41')  
                .setFooter(`PCN Unbans`)
                .setTimestamp();
    
                return channel.send(unbanEmbed);
                    
            } 
            catch (err) {
                console.log(`There was an error when trying to unban ${id}:`, err)
                return message.channel.send(`I couldn't unban ${id} due to an internal error. Please contact Awex or someone from the dev team.`)
                }
            }
        }
    }