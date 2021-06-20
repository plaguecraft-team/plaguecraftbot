module.exports = {
    name: 'unmute',
    execute(client, Discord, message, args) {
        const member = message.mentions.users.first();

        if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")){
            return message.channel.send('You do not have the permissions to run this command!')
        } else if (!args.length) {
            return message.reply(`You didn't specify a user to unmute!`);
        } else if (member === message.author) {
            return message.channel.send(`How are you expecting to unmute yourself when you can't even mute yourself in the first place?`)
        }

        if(member) {
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
            let memberTarget = message.guild.members.cache.get(target.id);

            try {
                memberTarget.roles.remove(muteRole.id);
                message.channel.send(`${memberTarget} has been unmuted.`)  
                console.log(`UID ${memberTarget} has been unmuted!`)     
                
                const channel = client.channels.cache.find(channel => channel.id === "837796493159039008")
    
                const unmuteEmbed = new Discord.MessageEmbed()
                
                .setTitle('Unmuted!')
                .setThumbnail('https://plaguecraft.xyz/storage/assets/img/logo.png')
                .setDescription(`${message.author} has unmuted ${memberTarget}!`)
                .setColor('#03fc41')  
                .setFooter(`PCN Unmutes`)
                .setTimestamp();
    
                channel.send(unmuteEmbed);
            }
            catch (err) {
                console.log(`There was an error while trying to unmute ${memberTarget}:`, err)
                return message.channel.send(`I couldn't unmute ${memberTarget} due to an internal error. Please contact Awex or someone from the dev team.`)
            }
        }
    }
}