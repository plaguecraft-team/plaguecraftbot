module.exports = {
	name: 'ping',
	description: "Calculates bot ping and tests latency.",
	execute(message, args) {
		message.channel.send(`Pong, ${message.author}! The current ping between you and the bot is ${Date.now() - messages.createdTimestamp}ms.`)
	}
}