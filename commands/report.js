module.exports = {
	name: 'report',
	description: 'Allows someone to report a user',
	execute(message, args, Discord, client) {

		const target = message.mentions.users.first();

		if(!args[0]) {
			return message.reply(`you didn't specify a user!`)
			setTimeout(() => message.delete(), 5000);
		}

		if(!args[1]) {
			return message.reply(`you didn't specify a reason!`)
			setTimeout(() => message.delete(), 5000);
		}

		const reason = args.slice(1).join(' ');
		message.delete();

		const reportEmbed = new Discord.MessageEmbed()
		.setTitle(`Report!`)
		.setColor(`#c7002e`)
		.setThumbnail(`https://plaguecraft.xyz/assets/img/logo.png`)
		.setDescription(`${message.author} has reported ${target} for:\n "${reason}".\n\n**Target Users UID: ${target.id}**`)
		.setFooter(`PCN Reports`)
		.setTimestamp();

            const channel = client.channels.cache.find(channel => channel.name === "punishments")
			channel.send(reportEmbed);
			console.log(`${message.author} has made a report on ${target} for "${reason}"`)
			message.author.send(`Thanks for your report on ${target}. It's been sent to our team for further review! We'll shoot you a DM with our findings.\nAs always, if this user is harassing you via direct message or in other means, please block them. We'll report them to Discord if deemed needed by our Moderation Team.\n<3,\nThe PlagueCraft Development Team`)
	}
}