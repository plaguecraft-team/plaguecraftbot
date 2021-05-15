module.exports = {
    name: 'bug',
    execute(client, Discord, message, args) {

        if(!args[0]) {
            return message.channel.send(`You need to add the bug you're facing to this message!`)
        }

        const bug = args.slice(0).join(' ');
        const channel = client.channels.cache.find(channel => channel.name === "🐛bugs🐛")
        let userID = client.users.fetch(`${message.author.id}`);
            userID.then(function(result1) {
                const imgURL = result1.displayAvatarURL();

        const bugEmbed = new Discord.MessageEmbed()
        .setTitle(`Bug Report!`)
        .setThumbnail('https://plaguecraft.xyz/storage/assets/img/logo.png')
        .setAuthor(`${message.author.username}`, `${imgURL}`)
        .setDescription(`**${message.author} submitted a bug report!**\n\n**Bug:** ${bug}`)
        .setColor('#c7002e')
        .setFooter('PCN')
        .setTimestamp();
        channel.send(bugEmbed)
        });
    }  
}