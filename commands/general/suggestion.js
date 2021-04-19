// This module was contributed by RandomMafia11.

module.exports = {
	name: 'suggest',
	description: "Suggestions from people",
    async execute(client, message, args, Discord) {
        
        const channel = client.channels.cache.find(channel => channel.name === "suggestions"); // Find the suggestions channel

        if(!channel) { // If it doesn't exist, return this and break from the rest of the code.
            return message.channel.send('The suggestion channel does not exist! Please check with the admins of this server.');
        } else {

            let messageArgs = args.join(' '); // Same thing as stats.js, but make it not have ',,,' in between

            const suggestionEmbed = new Discord.MessageEmbed() // embed
        .setTitle(`New Suggestion!`)
        .setColor('#c7002e')
        .setAuthor(`${message.author.username}`, message.author.avatarURL())
        .setDescription(`${message.author} has suggested the following: ${messageArgs}`)
        .setFooter(`PCN Suggestions`)
        .setTimestamp();

        console.log(`${message.author.username} has made the following suggestion: ${messageArgs}`) // Log the suggestion

        return channel.send(suggestionEmbed).then((msg) =>{ // Add reactions
            msg.react('👍');
            msg.react('👎');
            message.delete();
        }).catch((err)=>{
            throw err;
        });
        } 
    }
}