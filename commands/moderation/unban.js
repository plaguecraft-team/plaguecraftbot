module.exports = {
    name: 'unban',
    async execute(client, Discord, message, args) {
        const member = message.mentions.users.first();

        if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")){
            return message.channel.send('You do not have the permissions to run this command!')
        } else if (!args.length) {
            return message.reply(`You didn't specify a user to unban!`);
        } else if (member === message.author) {
            return message.channel.send(`How are you expecting to unban yourself when you can't even ban yourself in the first place?`)
        }

        if(member) {
            let memberTarget = message.guild.members.cache.get(member.id);

            try {
                const banList = await message.guild.fetchBans();
              
                const bannedUser = banList.find(user => user.id === `${memberTarget}`);
              
                if (bannedUser) {
                    message.channel.send(`${memberTarget} has been unbanned.`)  
                    console.log(`UID ${memberTarget} has been unbanned!`)     
                    
                    const channel = client.channels.cache.find(channel => channel.name === "📞bot-notifications📞")
        
                    const unbanEmbed = new Discord.MessageEmbed()
                    
                    .setTitle('Unbanned!')
                    .setThumbnail('https://plaguecraft.xyz/storage/assets/img/logo.png')
                    .setDescription(`${message.author} has unbanned ${memberTarget}!`)
                    .setColor('#03fc41')  
                    .setFooter(`PCN Unbans`)
                    .setTimestamp();
        
                    return channel.send(unbanEmbed);
            } else if (!bannedUser) {
                await message.channel.send(`${memberTarget.username} is not banned.`)
            }
        }
            catch (err) {
                console.log(`There was an error when trying to unban ${memberTarget.username}:`, err)
                return message.channel.send(`I couldn't unban ${memberTarget.username} due to an internal error. Please contact Awex or someone from the dev team.`)
            }
        }
    }
}