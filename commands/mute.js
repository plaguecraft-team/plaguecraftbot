const ms = require('ms');

module.exports = {
    name: 'mute',
    description: "PCN Mute Command",
    execute(message, args) {
        
        if(message.member.roles.cache.some(r => r.name === "Mod Bot User")){
        const target = message.mentions.users.first();
        

        if(!args.length) {
                return message.reply(`You didn't specify a user!`);
            }

        if (target) {
 
             let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
 
            let memberTarget = message.guild.members.cache.get(target.id);
 
            if (!args[1]) {
                memberTarget.roles.add(muteRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been muted`);
                console.log(`UID ${memberTarget} has been muted!`)
                return
            }
            memberTarget.roles.add(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);
            console.log(`UID ${memberTarget} has been muted for ${ms(ms(args[1]))}`)
 
            setTimeout(function () {
                memberTarget.roles.remove(muteRole.id);
            }, ms(args[1]));
        } else {
            message.channel.send('Cant find that member!');
            }
        } else {
            message.reply('You do not have the permissions to use this command!')
        }

    }
}