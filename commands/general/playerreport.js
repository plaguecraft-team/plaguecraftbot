module.exports = {
    name: 'playerreport',
    async execute(Discord, client, message, args, minecraftPlayer) {

		if(!args[0]) {
			return message.reply(`you didn't specify a user!`)
		}

		if(!args[1]) {
			return message.reply(`you didn't specify why you're reporting this user!`)
		}

		try{
        const { uuid } = await minecraftPlayer(`${args[0]}`)

		const reason = args.slice(1).join(' ');

		message.delete();

		const reportEmbed = new Discord.MessageEmbed()
		.setTitle(`In-Game Player Report!`)
		.setColor(`#c7002e`)
		.setThumbnail(`https://plaguecraft.xyz/storage/assets/img/logo.png`)
		.setDescription(`${message.author} has reported ${args[0]} for **${reason}** \n\n**Target Users Mojang UUID: ${uuid}**`)
		.setFooter(`PCN Reports`)
		.setTimestamp();

            const channel = client.channels.cache.find(channel => channel.name === "📞bot-notifications📞")
			channel.send(reportEmbed);
			console.log(`${message.author} has made a report on ${args[0]}`)
			message.author.send(`Thanks for your report on ${args[0]}. It's been sent to our team for further review! We'll shoot you a DM with our findings.\nIf the user is continuously harassing you on the network, please log out while we investigate this issue. We'll deal with it!\nIf the user is hacking, we might reach out for more evidence. You are free to create a ticket to chat with us as well.\n<3,\nThe PlagueCraft Development Team`)
		}
			catch(err){
				return message.channel.send(`That player could not be found via their Mojang UUID! If you're tagging someone in this Discord, that won't work. You'll need to do it with their in-game name.`)
			}
		}
}