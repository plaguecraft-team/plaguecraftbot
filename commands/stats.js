module.exports = {
	name: 'stats',
	description: 'Returns player statistics',
	async execute(client, Discord, message, args, request, minecraftPlayer) {

		const user = args.slice(1).join(' '); // Cutting the gamemode off

		const { uuid } = await minecraftPlayer(`${args[1]}`); // Converts player name to UUID for the econ endpoint to actually function

		let econurl = `https://api.plaguecraft.xyz/v1/smp/bal?uuid=${uuid}` // Economy API URL
		let swurl = `https://api.plaguecraft.xyz/v1/sw/user?player=${user}` // SkyWars API URL
		let options = {json: true}; // request module options

		if(!args[0]) { // Checks if the user did not add a gamemode or username
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		
		if (args[0] === 'economy') { // Economy argument
			if(!args[1]) {
				return message.reply(`you didn't specify a user to lookup!`)
			}

			request(econurl, options, (error, res, body) => {
				if(error) { // Error handler
					console.log(error) // Log the error
					return message.channel.send(`I'm having trouble receiving data from the API. Please open a ticket to the PCN Team.`) // Let the user know something went wrong
				};

				if(!error && res.statusCode == 200) { // Double checking the response is 200 OK
					var data = JSON.stringify(body)
					const econEmbed = new Discord.MessageEmbed() // New Embed
					.setTitle('PlagueCraft Economy Lookup')
					.setURL(econurl)
					.setThumbnail(`https://plaguecraft.xyz/storage/assets/img/logo.png`)
					.setColor(`#c7002e`)
					.setAuthor(`${user} statistics`, `https://minotar.net/avatar/${user}`)
					.setDescription(`Our API returned the following information!\n\n${data}\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.`)
					.setFooter(`PCN Lookup`)
					.setTimestamp();

					console.log(`${message.author} got the following data from the REST API:`, data) // Log and send the data & embed.
					return message.channel.send(econEmbed);
				}
			})} 

		if (args[0] === 'econ') {
			if(!args[1]) {
				return message.reply(`you didn't specify a user to lookup!`)
			}

			request(econurl, options, (error, res, body) => {
				if(error) { // Error handler
					console.log(error) // Log the error
					return message.channel.send(`I'm having trouble receiving data from the API. Please open a ticket to the PCN Team.`) // Let the user know something went wrong
				};

				if(!error && res.statusCode == 200) { // Double checking the response is 200 OK
					var data = JSON.stringify(body)
					const econEmbed = new Discord.MessageEmbed() // New Embed
					.setTitle('PlagueCraft Economy Lookup')
					.setThumbnail(`https://plaguecraft.xyz/storage/assets/img/logo.png`)
					.setURL(econurl)
					.setColor(`#c7002e`)
					.setAuthor(`${user} statistics`, `https://minotar.net/avatar/${user}`)
					.setDescription(`Our API returned the following information!\n\n${data}\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.\n\n**REMEMBER**: If you get the empty brackets, make sure you're using your Mojang-issued UUID. You can find that out [here](https://minecraft-techworld.com/uuid-lookup-tool).`)
					.setFooter(`PCN Lookup`)
					.setTimestamp();

					console.log(`${message.author} got the following data from the REST API:`, data) // Log and send the data & embed.
					return message.channel.send(econEmbed);

				}
			})} else if (args[0] === 'sw') {
				
				if(!args[1]) {
					return message.reply(`you didn't specify a user to lookup!`)
				}
	
				request(swurl, options, (error, res, body) => {
					if(error) { // Error handler
						console.log(error) // Log the error
						return message.channel.send(`I'm having trouble receiving data from the API. Please open a ticket to the PCN Team.`) // Let the user know something went wrong
					};
	
					if(!error && res.statusCode == 200) { // Double checking the response is 200 OK
						var data = JSON.stringify(body)
						const swEmbed = new Discord.MessageEmbed() // New Embed
						.setTitle('PlagueCraft SkyWars Lookup')
						.setThumbnail(`https://plaguecraft.xyz/storage/assets/img/logo.png`)
						.setURL(swurl)
						.setColor(`#c7002e`)
						.setAuthor(`${user} statistics`, `https://minotar.net/avatar/${user}`)
						.setDescription(`Our API returned the following information!\n\n${data}\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.`)
						.setFooter(`PCN Lookup`)
						.setTimestamp();
	
						console.log(`${message.author} got the following data from the REST API:`, data) // Log and send the data & embed.
						return message.channel.send(swEmbed);
						
					}
				})
			}

	}
}