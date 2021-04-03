module.exports = {
	name: 'ping',
	description: "Calculates bot ping and tests latency.",
	execute(messages, args) {
		messages.channel.send(`Pong, ${messages.author}! The current ping between you and the bot is ${Date.now() - messages.createdTimestamp}ms.`)
	}
}