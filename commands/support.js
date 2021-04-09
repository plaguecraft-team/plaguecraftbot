module.exports = {
	name: 'support',
	description: "PCN Support - Returns support topics",
	execute(message, args, Discord, client) {

		if(!args.length) {
			return message.channel.send(`You need to specify a support topic, ${message.author}.\n*PS: Don't know what our topics are? Give **pcn!support topics** a run!*`);
		}

		// Start of support topic code

		if (args[0] === 'plots') {
			const plotsEmbed = new Discord.MessageEmbed()
			.setTitle(`PlagueCraft Knowledge Base`)
			.setColor(`#c7002e`)
			.setDescription(`The PCNSMP allows for users to claim their own plots and make shops out of them, for storage, or whatever you desire!\n\nThis can be done by claiming a plot in the plots world.\n\nFollow the instructions at the SMP spawn!\nIf you can't figure it out, please reach out to us via [email](https://plaguecraft.xyz/contact) or just use the **pcn!ticket** command!`)
			.setThumbnail(`https://plaguecraft.xyz/assets/img/logo.png`)
			.setFooter(`PCN Support`)
			.setTimestamp();

				return message.channel.send(plotsEmbed);

		} else if (args[0] === 'reports') {
		const reportingEmbed = new Discord.MessageEmbed()
		.setTitle(`PlagueCraft Knowledge Base`)
		.setColor(`#c7002e`)
		.setDescription(`If a user is violating our rules, we need to know so we can appropriately deal with them.\n\nIf you need to double check what our rules are, please check out the guidelines channel in this Discord if it is a Discord issue, or our forums if it is a server/forums issue.\n\n To properly report a user, follow these steps;\nTheir UID will be given to us in your report.\nScreenshot their message (ONLY if the report command is not working, this is used to be sent in a ticket using pcn!ticket or via email (hello@plaguecraft.xyz).)\nImmediately send the evidence to us in a report (using pcn!report) so we can check it out.\n\nRest assured, we'll look into it!`)
		.setThumbnail(`https://plaguecraft.xyz/assets/img/logo.png`)
		.setFooter(`PCN Support`)
		.setTimestamp();

		return message.channel.send(reportingEmbed);
		
		} else if (args[0] === 'topics') {
			const topicsEmbed = new Discord.MessageEmbed()
			.setTitle(`PlagueCraft Knowledge Base`)
			.setColor(`#c7002e`)
			.setDescription(`Need support? Trying to learn something? You've come to the right place!\n**Our current topics are:**\nreports\nplots`)
			.setColor(`#c7002e`)
			.setFooter(`PCN Support`)
			.setTimestamp();

			return message.channel.send(topicsEmbed);
		}
	}
}