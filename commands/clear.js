module.exports = {
	name: 'clear',
	description: 'PCN Clear Command',
	async execute(message, args, Discord, client) {
		if(message.member.roles.cache.some(r => r.name === "Mod Bot User")){

        if(!args[0]) return message.reply("Please enter the amount of messages to clear!");
        if(isNaN(args[0])) return message.reply("Please use a real number!");

        if(args[0] > 100) return message.reply("100 is the max number of messages at once!");
        if(args[0] < 1) return message.reply("The supplied value is too small, it must be bigger than 1!");

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages)

            const purgeEmbed = new Discord.MessageEmbed()
            .setTitle('Messages purged!')
            .setThumbnail('https://plaguecraft.xyz/assets/img/logo.png')
            .setDescription(`${message.author} has purged ${args} messages!`)
            .setColor('#c7002e')

            const channel = client.channels.cache.find(channel => channel.name === "messages")

            channel.send(purgeEmbed);

            console.log(`${message.author} has cleared ${args} messages!`)
        })
        }
	}
}