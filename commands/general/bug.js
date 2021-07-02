module.exports = {
    name: 'bug',
    execute(client, Discord, message, args, color, thumb) {

        if(!args[0]) {
            // return message.channel.send(`You need to add the bug you're facing to this message!`)
            const synEmbed = new Discord.MessageEmbed()
            .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
            .setTitle(`pcn!bug`)
            .setColor(color)
            .addFields(
                { name: 'Description', value: 'Submits a bug report to the bugs channel.'},
                { name: 'Syntax', value: 'pcn!bug [bug]' },
                { name: 'Missing Field', value: 'No bug supplied' }
            )

            return message.channel.send(synEmbed)
        }

        const bug = args.slice(0).join(' ');
        const channel = client.channels.cache.find(channel => channel.id === process.env.bugsChannel)
        let userID = client.users.fetch(`${message.author.id}`);
            userID.then(function(result1) {
                const imgURL = result1.displayAvatarURL();

        const bugEmbed = new Discord.MessageEmbed()
        .setTitle(`Bug Report!`)
        .setAuthor(`${message.author.username}`, `${imgURL}`)
        .setDescription(`**${message.author} submitted a bug report!**\n\n**Bug:** ${bug}`)
        .setColor(color)
        .setTimestamp();
        channel.send(bugEmbed)
        });
    }  
}