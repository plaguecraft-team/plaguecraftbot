// This module was contributed by RandomMafia11.

module.exports = {
	name: 'suggest',
	description: "Suggestions from people",
    async execute(client, Discord, message, args, color) {
        
        const channel = client.channels.cache.find(channel => channel.id === process.env.suggestionChannel); // Find the suggestions channel

        if(!channel) { // If it doesn't exist, return this and break from the rest of the code.
            return message.channel.send('The suggestion channel does not exist! Please check with the admins of this server.');
        } else {

            if(!args[0]) {
                const synEmbed = new Discord.MessageEmbed()
                .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
                .setTitle(`pcn!suggest`)
                .setColor(color)
                .addFields(
                    { name: 'Description', value: 'Submits a suggestion to the suggestion channel.'},
                    { name: 'Syntax', value: 'pcn!suggest [suggestion]' },
                    { name: 'Missing Field', value: 'No suggestion supplied'}
                )
    
                return message.channel.send(synEmbed)
            }
            
            let messageArgs = args.join(' '); // Same thing as stats.js, but make it not have ',,,' in between

            const suggestionEmbed = new Discord.MessageEmbed() // embed
        .setTitle(`New Suggestion!`)
        .setColor(color)
        .setAuthor(`${message.author.username}`, message.author.avatarURL())
        .setDescription(`${message.author} has suggested the following: ${messageArgs}`)
        .setFooter(`PCN Suggestions`)
        .setTimestamp();

        console.log(`${message.author.tag} has made the following suggestion: ${messageArgs}`) // Log the suggestion

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