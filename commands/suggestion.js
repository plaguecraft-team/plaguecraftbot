// This module was contributed by RandomMafia11.

module.exports = {
	name: 'suggest',
	description: "Suggestions from people",
    async execute(message, args, Discord, client) {
        
        const channel = client.channels.cache.find(channel => channel.name === "suggestions");

        if(!channel) {
            return message.channel.send('The suggestion channel does not exist! Please check with the admins of this server.');
        } else {

            let messageArgs = args.join(' ');

            const suggestionEmbed = new Discord.MessageEmbed()
        .setTitle(`New Suggestion!`)
        .setColor('#c7002e')
        .setAuthor(`${message.author.username}`, message.author.avatarURL())
        .setDescription(`${message.author} has suggested the following: ${messageArgs}`)
        .setFooter(`PCN Suggestions`)
        .setTimestamp();

        console.log(`${message.author.username} has made the following suggestion: ${messageArgs}`)

        return channel.send(suggestionEmbed).then((msg) =>{
            msg.react('👍');
            msg.react('👎');
            message.delete();
        }).catch((err)=>{
            throw err;
        });
        } 
    }
}