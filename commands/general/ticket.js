// This module was contributed by RandomMafia11.

module.exports = {
    name: 'ticket',
    async execute(client, Discord, message, args) {
        const channel = await message.guild.channels.create(`ticket: ${message.author.tag}`); // Define how to create the channel
        channel.setParent('774727207671037955'); // Category ID of the channel 
        const modrole = message.guild.roles.cache.get("829362215286210591"); 

        channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false
        });

        channel.updateOverwrite(message.author, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });

        channel.updateOverwrite(modrole, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true
        });

        const ticketEmbed = new Discord.MessageEmbed() // Shoot the team a ticket notification
        .setTitle('Ticket Notification!')
        .setThumbnail('https://plaguecraft.xyz/storage/assets/img/logo.png')
        .setDescription(`${message.author} has created a new ticket!`)
        .setColor('#03fc41')  

        const channelnoti = client.channels.cache.find(channel => channel.id === "843239726366720020") // Find the team's notification channel

        channelnoti.send(ticketEmbed) // Send that embed

        const reactionMessage = await channel.send('Thank you for contacting PCN Support, our team will be right with you!'); // Let the user know their request went through

        try {
            await reactionMessage.react("🔒");
            await reactionMessage.react("⛔");
        } catch(err) {
            channel.send('There was an error reacting to the previous message, please contact RandomMafia11 and/or reach out via https://plaguecraft.xyz/contact.'); // If it can't react, send this msg
            throw err;
        }

        const collector = reactionMessage.createReactionCollector((reaction, user) => message.guild.members.cache.find((member) => member.id === user.id),
        { dispose: true}
        );

        collector.on('collect', (reaction, user) =>{
            switch (reaction.emoji.name){ // If the lock reaction is used, lock the ticket
                case "🔒":
                    channel.updateOverwrite(message.author, { SEND_MESSAGES: false});
                    break;
                case "⛔":
                    channel.send('This channel will be deleted in 5 seconds!') // If the delete reaction is used, then delete the channel
                    setTimeout(() => channel.delete(), 5000);
                    break;
            }
        });

        message.channel.send(`Our team will be with you in ${channel}`).then((msg) =>{
            setTimeout(() => msg.delete(), 7000);
            setTimeout(() => message.delete(), 3000);
        }).catch((err) =>{
            throw err;
        })
    }
}