// This module was contributed by RandomMafia11.

module.exports = {
	name: 'clear',
	description: 'PCN Clear Command',
	async execute(client, Discord, message, args) {
        if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")){
			return message.channel.send('You do not have the permissions to run this command!')
		}

        if(!args[0]) return message.reply("please enter the amount of messages to clear!");
        if(isNaN(args[0])) return message.reply("please use a real number!");

        if(args[0] > 100) return message.reply("100 is the max number of messages at once!");
        if(args[0] < 1) return message.reply("The supplied value is too small, it must be bigger than 1!");

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            // console.log(messages);
            message.channel.bulkDelete(messages).catch(console.error)

            const purgeEmbed = new Discord.MessageEmbed()
            .setTitle('Messages purged!')
            .setThumbnail('https://plaguecraft.xyz/storage/assets/img/logo.png')
            .setDescription(`${message.author} has purged ${args} messages!`)
            .setColor('#c7002e')
            .setFooter('PCN Bulk Clear')
            .setTimestamp();

            const channel = client.channels.cache.find(channel => channel.name === "📞bot-notifications📞")

            channel.send(purgeEmbed);

            console.log(`${message.author} has cleared ${args} messages!`)
        }) 
	}
}