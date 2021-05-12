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

			const econEmbed = new Discord.MessageEmbed() // New Embed
					.setTitle('PlagueCraft Economy Lookup')
					.setThumbnail(`https://plaguecraft.xyz/storage/assets/img/logo.png`)
					.setURL(econurl)
					.setColor(`#c7002e`)
					.setAuthor(`${user} statistics`, `https://minotar.net/avatar/${user}`)
					.addFields(
						{ name: 'Player', value: `${response[0].NAME}`, inline: true },
						{ name: 'Balance', value: `${response[0].MONEY}`, inline: true },
					)
					.setDescription(`Our API returned the following information!\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.`)
					.setFooter(`PCN Lookup`)
					.setTimestamp();

					console.log(`${message.author} got the following data from the REST API:`, response) // Log and send the data & embed.
					return message.channel.send(econEmbed);
			}

		if (args[0] === 'econ') {
			if(!args[1]) {
				return message.reply(`you didn't specify a user to lookup!`)
			}
			
			const { response } = await fetch(econurl).then(response => response.json());

			const econEmbed = new Discord.MessageEmbed() // New Embed
					.setTitle('PlagueCraft Economy Lookup')
					.setThumbnail(`https://plaguecraft.xyz/storage/assets/img/logo.png`)
					.setURL(econurl)
					.setColor(`#c7002e`)
					.setAuthor(`${user} statistics`, `https://minotar.net/avatar/${user}`)
					.addFields(
						{ name: 'Player', value: `${response[0].NAME}`, inline: true },
						{ name: 'Balance', value: `${response[0].MONEY}`, inline: true },
					)
					.setDescription(`Our API returned the following information!\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.`)
					.setFooter(`PCN Lookup`)
					.setTimestamp();

					console.log(`${message.author} got the following data from the REST API:`, response) // Log and send the data & embed.
					return message.channel.send(econEmbed);

			} else if (args[0] === 'sw') {
				
				if(!args[1]) {
					return message.reply(`you didn't specify a user to lookup!`)
				}

				const { response } = await fetch(swurl).then(response => response.json());
	
						const swEmbed = new Discord.MessageEmbed() // New Embed
						.setTitle('PlagueCraft SkyWars Lookup')
						.setThumbnail(`https://plaguecraft.xyz/storage/assets/img/logo.png`)
						.setURL(swurl)
						.setColor(`#c7002e`)
						.addFields(
							{ name: 'Player Name', value: `${response[0].player_name}`, inline: true },
							{ name: 'Wins', value: `${response[0].wins}`, inline: true },
							{ name: 'Losses', value: `${response[0].losses}`, inline: true },
							{ name: 'Kills', value: `${response[0].kills}`, inline: true },
							{ name: 'Deaths', value: `${response[0].deaths}`, inline: true },
							{ name: 'XP', value: `${response[0].xp}`, inline: true },
						)
						.setAuthor(`${user} statistics`, `https://minotar.net/avatar/${user}`)
						.setDescription(`Our API returned the following information!\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.`)
						.setFooter(`PCN Lookup`)
						.setTimestamp();
	
						console.log(`${message.author} got the following data from the REST API:`, response) // Log and send the data & embed.
						return message.channel.send(swEmbed);
						
					} else if (args[0] === 'skywars') {
						const { response } = await fetch(swurl).then(response => response.json());
	
						const swEmbed = new Discord.MessageEmbed() // New Embed
						.setTitle('PlagueCraft SkyWars Lookup')
						.setThumbnail(`https://plaguecraft.xyz/storage/assets/img/logo.png`)
						.setURL(swurl)
						.setColor(`#c7002e`)
						.addFields(
							{ name: 'Player Name', value: `${response[0].player_name}`, inline: true },
							{ name: 'Wins', value: `${response[0].wins}`, inline: true },
							{ name: 'Losses', value: `${response[0].losses}`, inline: true },
							{ name: 'Kills', value: `${response[0].kills}`, inline: true },
							{ name: 'Deaths', value: `${response[0].deaths}`, inline: true },
							{ name: 'XP', value: `${response[0].xp}`, inline: true },
						)
						.setAuthor(`${user} statistics`, `https://minotar.net/avatar/${user}`)
						.setDescription(`Our API returned the following information!\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.`)
						.setFooter(`PCN Lookup`)
						.setTimestamp();
	
						console.log(`${message.author} got the following data from the REST API:`, response) // Log and send the data & embed.
						return message.channel.send(swEmbed);
					}
				}
			}