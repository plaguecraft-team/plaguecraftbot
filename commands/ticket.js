// This module was contributed by RandomMafia11.

module.exports = {
	name: 'ticket',
	description: "Works on ticket ",
	async execute(messages, args) {
        const channel = await message.guild.channels.create(`ticket: ${message.author.tag}`);
        channel.setParent('828168413247176714'); // Category ID

        channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGE: false,
            VIEW_CHANNEL: false
        }); 
        channel.updateOverwrite(message.author, {
            SEND_MESSAGE: true,
            VIEW_CHANNEL: true    
        });

        const reactionMessage = await channel.send('Thank you for contacting PCN Support, our team will be right with you!');

        try{

            await reactionMessage.react("🔒");
            await reactionMessage.react("⛔");
        }catch(err){
            channel.send('There was an error reacting emojis to the previous message, please contact RandomMafia11 and/or reach out via https://support.plaguecraft.xyz.');
            throw err;
        }
        
        const collector = reactionMessage.createReactionCollector((reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission('ADMINISTRATOR'),
        { dispose: true}
        );
        
        collector.on('collect', (reaction, user) =>{
            switch (reaction.emoji.name){
                case "🔒":
                    channel.updateOverwrite(message.author, { SEND_MESSAGES: false});
                    break;
                case "⛔":
                    channel.send('This channel will be delelted in 5 seconds!')
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
    },
};