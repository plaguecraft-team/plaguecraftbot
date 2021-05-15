module.exports = {
	name: 'stats',
	description: 'Returns player statistics',
	async execute(client, Discord, message, args, fetch) {

		const user = args.slice(1).join(' '); // Cutting the gamemode off

		let econurl = `https://api.plaguecraft.xyz/v2/smp/econ/user?player=${user}` // Economy API URL
		let swurl = `https://api.plaguecraft.xyz/v2/sw/user?player=${user}` // SkyWars API URL
		let skillurl = `https://api.plaguecraft.xyz/v2/smp/skills/user?player=${user}` // Skills API URL

		if(!args[0]) { // Checks if the user did not add a gamemode or username
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}

		if(!args[1]) {
			return message.reply(`you didn't specify a user to lookup!`)
		}
		
		if (args[0] === 'economy') { // Economy argument

			const { response } = await fetch(econurl).then(response => response.json());

			const econEmbed = new Discord.MessageEmbed() // New Embed
					.setTitle('PlagueCraft Economy Lookup')
					.setThumbnail(`https://plaguecraft.xyz/storage/assets/img/logo.png`)
					.setURL(econurl)
					.setColor(`#c7002e`)
					.setAuthor(`${user} statistics`, `https://minotar.net/avatar/${user}`)
					.addFields(
						{ name: 'Player', value: `${user}`, inline: true },
						{ name: 'Balance', value: `${response[0].balance}`, inline: true },
					)
					.setDescription(`Our API returned the following information!\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.`)
					.setFooter(`PCN Lookup`)
					.setTimestamp();

					console.log(`${message.author} got the following data from the REST API:`, response) // Log and send the data & embed.
					return message.channel.send(econEmbed);
			}

		if (args[0] === 'econ') {
			
			const { response } = await fetch(econurl).then(response => response.json());

			const econEmbed = new Discord.MessageEmbed() // New Embed
					.setTitle('PlagueCraft Economy Lookup')
					.setThumbnail(`https://plaguecraft.xyz/storage/assets/img/logo.png`)
					.setURL(econurl)
					.setColor(`#c7002e`)
					.setAuthor(`${user} statistics`, `https://minotar.net/avatar/${user}`)
					.addFields(
						{ name: 'Player', value: `${user}`, inline: true },
						{ name: 'Balance', value: `${response[0].balance}`, inline: true },
					)
					.setDescription(`Our API returned the following information!\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.`)
					.setFooter(`PCN Lookup`)
					.setTimestamp();

					console.log(`${message.author} got the following data from the REST API:`, response) // Log and send the data & embed.
					return message.channel.send(econEmbed);

			} else if (args[0] === 'sw') {

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
						.setAuthor(`${response[0].player_name} statistics`, `https://minotar.net/avatar/${response[0].player_name}`)
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
						.setAuthor(`${response[0].player_name} statistics`, `https://minotar.net/avatar/${response[0].player_name}`)
						.setDescription(`Our API returned the following information!\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.`)
						.setFooter(`PCN Lookup`)
						.setTimestamp();
	
						console.log(`${message.author} got the following data from the REST API:`, response) // Log and send the data & embed.
						return message.channel.send(swEmbed);
					} else if (args[0] === 'skills') {
						const { response } = await fetch(skillurl).then(response => response.json());

						const skillsEmbed = new Discord.MessageEmbed() // New Embed
						.setTitle('PlagueCraft Skills Lookup')
						.setThumbnail(`https://plaguecraft.xyz/storage/assets/img/logo.png`)
						.setURL(skillurl)
						.setColor(`#c7002e`)
						.addFields(
							{ name: 'Agility', value: `${response[0].AGILITY_LEVEL}`, inline: true },
							{ name: 'Alchemy', value: `${response[0].ALCHEMY_LEVEL}`, inline: true },
							{ name: 'Archery', value: `${response[0].ARCHERY_LEVEL}`, inline: true },
							{ name: 'Defense', value: `${response[0].DEFENSE_LEVEL}`, inline: true },
							{ name: 'Enchanting', value: `${response[0].ENCHANTING_LEVEL}`, inline: true },
							{ name: 'Endurance', value: `${response[0].ENDURANCE_LEVEL}`, inline: true },
							{ name: 'Excavation', value: `${response[0].EXCAVATION_LEVEL}`, inline: true },
							{ name: 'Farming', value: `${response[0].FARMING_LEVEL}`, inline: true },
							{ name: 'Fighting', value: `${response[0].FIGHTING_LEVEL}`, inline: true },
							{ name: 'Fishing', value: `${response[0].FISHING_LEVEL}`, inline: true },
							{ name: 'Foraging', value: `${response[0].FORAGING_LEVEL}`, inline: true },
							{ name: 'Forging', value: `${response[0].FORGING_LEVEL}`, inline: true },
							{ name: 'Healing', value: `${response[0].HEALING_LEVEL}`, inline: true },
							{ name: 'Mining', value: `${response[0].MINING_LEVEL}`, inline: true },
							{ name: 'Sorcery', value: `${response[0].SORCERY_LEVEL}`, inline: true },
						)
						.setAuthor(`${user} statistics`, `https://minotar.net/avatar/${user}`)
						.setDescription(`Our API returned the following information!\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.`)
						.setFooter(`PCN Lookup`)
						.setTimestamp();

						message.channel.send(skillsEmbed)
					} else if (args[0] === 'skills-xp') {
						const { response } = await fetch(skillurl).then(response => response.json());

						const skillsEmbed = new Discord.MessageEmbed() // New Embed
						.setTitle('PlagueCraft Skills Lookup')
						.setThumbnail(`https://plaguecraft.xyz/storage/assets/img/logo.png`)
						.setURL(skillurl)
						.setColor(`#c7002e`)
						.addFields(
							{ name: 'Agility', value: `${response[0].AGILITY_XP}`, inline: true },
							{ name: 'Alchemy', value: `${response[0].ALCHEMY_XP}`, inline: true },
							{ name: 'Archery', value: `${response[0].ARCHERY_XP}`, inline: true },
							{ name: 'Defense', value: `${response[0].DEFENSE_XP}`, inline: true },
							{ name: 'Enchanting', value: `${response[0].ENCHANTING_XP}`, inline: true },
							{ name: 'Endurance', value: `${response[0].ENDURANCE_XP}`, inline: true },
							{ name: 'Excavation', value: `${response[0].EXCAVATION_XP}`, inline: true },
							{ name: 'Farming', value: `${response[0].FARMING_XP}`, inline: true },
							{ name: 'Fighting', value: `${response[0].FIGHTING_XP}`, inline: true },
							{ name: 'Fishing', value: `${response[0].FISHING_XP}`, inline: true },
							{ name: 'Foraging', value: `${response[0].FORAGING_XP}`, inline: true },
							{ name: 'Forging', value: `${response[0].FORGING_XP}`, inline: true },
							{ name: 'Healing', value: `${response[0].HEALING_XP}`, inline: true },
							{ name: 'Mining', value: `${response[0].MINING_XP}`, inline: true },
							{ name: 'Sorcery', value: `${response[0].SORCERY_XP}`, inline: true },
						)
						.setAuthor(`${user} statistics`, `https://minotar.net/avatar/${user}`)
						.setDescription(`Our API returned the following information!\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.`)
						.setFooter(`PCN Lookup`)
						.setTimestamp();

						message.channel.send(skillsEmbed)
					}
				}
			}