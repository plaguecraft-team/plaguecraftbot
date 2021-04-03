module.exports = {
	name: 'ip',
	description: "Responds with the PCN IP",
	execute(messages, args) {
		messages.channel.send(`Hey ${messages.author}, the IP is **play.plaguecraft.xyz**!`)
	}
}