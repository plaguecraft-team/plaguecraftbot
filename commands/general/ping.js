module.exports = {
	name: 'ping',
	description: "Calculates bot ping and tests latency.",
	execute(client, Discord, message, args) {
		return message.channel.send(`:ping_pong:\nBot latency: ${Date.now() - message.createdTimestamp}ms\nDiscord API Latency: ${Math.round(client.ws.ping)}ms`)
	}
}