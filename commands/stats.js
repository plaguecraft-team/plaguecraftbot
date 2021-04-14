module.exports = {
	name: 'stats',
	description: 'stats command',
	async execute(message, args, Discord, client, request, mi, https) {

	if (!args[0]) {
		return message.channel.send(`You didn't provide any gamemode, ${message.author}!`);
	}
	else if (args[0] === 'econ') { // Make sure user provided Minecraft Username
			if(!args[1]) {
				return message.reply(`you didn't specify a user to lookup in our REST API!`)
			}

		const user = args.slice(1).join(' '); // Cut the "econ" off so user can be combined to the URL correctly.
        

let url = `http://services.plaguecraft.xyz:3000/api/xconomy/findOne?_where=(player,eq,${user})`; // Define the URL and compile the args into it

let options = {json: true};

request(url, options, (error, res, body) => { // Get everything into variables n stuff
    if (error) { // If err is anything other than 200 OK, then..
        console.log(`REST call = err ETIMEDOUT`)
        return message.channel.send(`I'm having trouble receiving data from the REST API. Please contact the PlagueCraft Network Web Force (https://plaguecraft.xyz/directory).\nTo help us diagnose this, please pass this information on: ETIMEDOUT > services.plaguecraft.xyz. The API failed to respond.`)
    };

    if (!error && res.statusCode == 200) { // If the response = 200 OK, then..
        var string = JSON.stringify(body);
        const econEmbed = new Discord.MessageEmbed() // Generic Embed making
		    .setTitle('PlagueCraft Network Economy Lookup')
		    .setThumbnail(`https://plaguecraft.xyz/assets/img/logo.png`)
		    .setColor('#c7002e')
            .setAuthor(`${user} statistics`, `https://minotar.net/avatar/${user}`)
		    .setDescription(`Our backend returned the following information!\n\n${string}\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.`)
		    .setFooter('PCN Backend')
		    .setTimestamp();
      	
        message.channel.send(econEmbed);
        console.log(`${message.author} got the following data from the REST API:`, string) // Log and send the data & embed.

		    } 

        })} else if (args[0] === 'skywars') { // Same niche ^
			if(!args[1]) {
				return message.reply(`you didn't specify a user to lookup in our REST API!`);
			}

			const user = args.slice(1).join(' ');

let url = `http://services.plaguecraft.xyz:3000/api/sw_player/findOne?_where=(player_name,eq,${user})`; // aaaaaand continues on but make it skywars

let options = {json: true};

request(url, options, (error, res, body) => {
    if (error) {
        console.log(`REST call = err ETIMEDOUT`)
        return message.channel.send(`There was an error getting data from the REST API. Please contact the PlagueCraft Network Web Force (https://plaguecraft.xyz/directory).\nTo help us diagnose this, please pass this information on: services.plaguecraft.xyz did not respond in time for the request to complete.`)
    };

    if (!error && res.statusCode == 200) {
        var string = JSON.stringify(body);
           const econEmbed = new Discord.MessageEmbed()
           .setTitle('PlagueCraft Network SkyWars Lookup')
		    .setThumbnail(`https://plaguecraft.xyz/assets/img/logo.png`)
		    .setColor('#c7002e')
            .setAuthor(`${user} statistics`, `https://minotar.net/avatar/${user}`)
		    .setDescription(`Our backend returned the following information!\n\n${string}\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.`)
		    .setFooter('PCN Backend')
		    .setTimestamp();
      	
        message.channel.send(econEmbed);
        console.log(`${message.author} got the following data from the REST API:`, string)
    			    };
			    });
            } else if (args[0] === 'sw') {
				if(!args[1]) {
					return message.reply(`you didn't specify a user to lookup in our REST API!`);
				}
	
				const user = args.slice(1).join(' ');
	
	let url = `http://services.plaguecraft.xyz:3000/api/sw_player/findOne?_where=(player_name,eq,${user})`; // aaaaaand continues on but make it skywars
	
	let options = {json: true};
	
	request(url, options, (error, res, body) => {
		if (error) {
			console.log(`REST call = err ETIMEDOUT`)
			return message.channel.send(`There was an error getting data from the REST API. Please contact the PlagueCraft Network Web Force (https://plaguecraft.xyz/directory).\nTo help us diagnose this, please pass this information on: services.plaguecraft.xyz did not respond in time for the request to complete.`)
		};
	
		if (!error && res.statusCode == 200) {
			var string = JSON.stringify(body);
			   const econEmbed = new Discord.MessageEmbed()
			   .setTitle('PlagueCraft Network SkyWars Lookup')
				.setThumbnail(`https://plaguecraft.xyz/assets/img/logo.png`)
				.setColor('#c7002e')
				.setAuthor(`${user} statistics`, `https://minotar.net/avatar/${user}`)
				.setDescription(`Our backend returned the following information!\n\n${string}\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.`)
				.setFooter('PCN Backend')
				.setTimestamp();
			  
			message.channel.send(econEmbed);
			console.log(`${message.author} got the following data from the REST API:`, string)
						};
					});
			} else if (args[0] === 'economy') {
				if(!args[1]) {
					return message.reply(`you didn't specify a user to lookup in our REST API!`);
				}
	
				const user = args.slice(1).join(' ');
	
	let url = `http://services.plaguecraft.xyz:3000/api/xconomy/findOne?_where=(player,eq,${user})`; // aaaaaand continues on but make it skywars
	
	let options = {json: true};
	
	request(url, options, (error, res, body) => {
		if (error) {
			console.log(`REST call = err ETIMEDOUT`)
			return message.channel.send(`There was an error getting data from the REST API. Please contact the PlagueCraft Network Web Force (https://plaguecraft.xyz/directory).\nTo help us diagnose this, please pass this information on: services.plaguecraft.xyz did not respond in time for the request to complete.`)
		};
	
		if (!error && res.statusCode == 200) {
			var string = JSON.stringify(body);
			   const econEmbed = new Discord.MessageEmbed()
			   .setTitle('PlagueCraft Network Economy Lookup')
				.setThumbnail(`https://plaguecraft.xyz/assets/img/logo.png`)
				.setColor('#c7002e')
				.setAuthor(`${user} statistics`, `https://minotar.net/avatar/${user}`)
				.setDescription(`Our backend returned the following information!\n\n${string}\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.`)
				.setFooter('PCN Backend')
				.setTimestamp();
			  
			message.channel.send(econEmbed);
			console.log(`${message.author} got the following data from the REST API:`, string)
						};
					});
			}
    }
}
