module.exports = {
	name: 'ping',
	description: "Calculates bot ping and tests latency.",
	execute(client, message, args, Discord) {
		message.channel.send(`:ping_pong:\nThe current ping between you and the bot is ${Date.now() - message.createdTimestamp}ms.`)
	}
}