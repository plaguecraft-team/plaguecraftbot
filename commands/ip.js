module.exports = {
	name: 'ip',
	description: "Responds with the PCN IP",
	execute(message, args) {
		message.channel.send(`Hey ${message.author}, the IP is **play.plaguecraft.xyz**!`)
	}
}