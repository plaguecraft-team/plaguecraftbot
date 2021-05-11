module.exports = {
	name: 'stats',
	description: 'Returns player statistics',
	async execute(client, Discord, message, args, fetch) {

		const user = args.slice(1).join(' '); // Cutting the gamemode off

		let econurl = `https://api.plaguecraft.xyz/v1/smp/user?player=${user}` // Economy API URL
		let swurl = `https://api.plaguecraft.xyz/v1/sw/user?player=${user}` // SkyWars API URL

		if(!args[0]) { // Checks if the user did not add a gamemode or username
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		
		if (args[0] === 'economy') { // Economy argument
			if(!args[1]) {
				return message.reply(`you didn't specify a user to lookup!`)
			}

			const { response } = await fetch(econurl).then(response => response.json());
			const json = JSON.stringify(response);

			const econEmbed = new Discord.MessageEmbed() // New Embed
					.setTitle('PlagueCraft Economy Lookup')
					.setThumbnail(`https://plaguecraft.xyz/storage/assets/img/logo.png`)
					.setURL(econurl)
					.setColor(`#c7002e`)
					.setAuthor(`${user} statistics`, `https://minotar.net/avatar/${user}`)
					.setDescription(`Our API returned the following information!\n\n${json}\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.\n\n**REMEMBER**: If you get the empty brackets, make sure you're using your Mojang-issued UUID. You can find that out [here](https://minecraft-techworld.com/uuid-lookup-tool).`)
					.setFooter(`PCN Lookup`)
					.setTimestamp();

					console.log(`${message.author} got the following data from the REST API:`, json) // Log and send the data & embed.
					return message.channel.send(econEmbed);
			}

		if (args[0] === 'econ') {
			if(!args[1]) {
				return message.reply(`you didn't specify a user to lookup!`)
			}
			
			const { response } = await fetch(econurl).then(response => response.json());
			const json = JSON.stringify(response);

			const econEmbed = new Discord.MessageEmbed() // New Embed
					.setTitle('PlagueCraft Economy Lookup')
					.setThumbnail(`https://plaguecraft.xyz/storage/assets/img/logo.png`)
					.setURL(econurl)
					.setColor(`#c7002e`)
					.setAuthor(`${user} statistics`, `https://minotar.net/avatar/${user}`)
					.setDescription(`Our API returned the following information!\n\n${json}\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.\n\n**REMEMBER**: If you get the empty brackets, make sure you're using your Mojang-issued UUID. You can find that out [here](https://minecraft-techworld.com/uuid-lookup-tool).`)
					.setFooter(`PCN Lookup`)
					.setTimestamp();

					console.log(`${message.author} got the following data from the REST API:`, json) // Log and send the data & embed.
					return message.channel.send(econEmbed);

			} else if (args[0] === 'sw') {
				
				if(!args[1]) {
					return message.reply(`you didn't specify a user to lookup!`)
				}

				const { response } = await fetch(swurl).then(response => response.json());
				const json = JSON.stringify(response);
	
						const swEmbed = new Discord.MessageEmbed() // New Embed
						.setTitle('PlagueCraft SkyWars Lookup')
						.setThumbnail(`https://plaguecraft.xyz/storage/assets/img/logo.png`)
						.setURL(swurl)
						.setColor(`#c7002e`)
						.setAuthor(`${user} statistics`, `https://minotar.net/avatar/${user}`)
						.setDescription(`Our API returned the following information!\n\n${json}\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.`)
						.setFooter(`PCN Lookup`)
						.setTimestamp();
	
						console.log(`${message.author} got the following data from the REST API:`, json) // Log and send the data & embed.
						return message.channel.send(swEmbed);
						
					} else if (args[0] === 'skywars') {
						const { response } = await fetch(swurl).then(response => response.json());
						const json = JSON.stringify(response);
			
								const swEmbed = new Discord.MessageEmbed() // New Embed
								.setTitle('PlagueCraft SkyWars Lookup')
								.setThumbnail(`https://plaguecraft.xyz/storage/assets/img/logo.png`)
								.setURL(swurl)
								.setColor(`#c7002e`)
								.setAuthor(`${user} statistics`, `https://minotar.net/avatar/${user}`)
								.setDescription(`Our API returned the following information!\n\n${json}\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.`)
								.setFooter(`PCN Lookup`)
								.setTimestamp();
			
								console.log(`${message.author} got the following data from the REST API:`, json) // Log and send the data & embed.
								return message.channel.send(swEmbed);
					}
				}
			}