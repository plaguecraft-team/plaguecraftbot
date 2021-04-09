module.exports = {
	name: 'stats',
	description: 'stats command',
	execute(message, args, Discord, client, http) {

	if (!args[0]) {
		return message.channel.send(`You didn't provide any gamemode, ${message.author}!`);
	}
	else if (args[0] === 'econ') {
			if(!args[1]) {
				return message.reply(`you didn't specify a user to lookup in our REST API!`)
			}
		const user = args.slice(1).join(' ');
		http
  	.request(
    {
      hostname: "services.plaguecraft.xyz", // url for backend rest api
      port: "3000", // port for backend api
      path: `/api/xconomy/findOne?_where=(player,eq,${user})` // path for backend api, all same in skywars.js
    },
    res => {
      let data = ""

      res.on("data", d => {
        data += d
      })
      res.on("end", () => {
    
    const econEmbed = new Discord.MessageEmbed()
    .setTitle('PlagueCraft Network Backend Lookup')
    .setThumbnail('https://plaguecraft.xyz/assets/img/logo.png')
    .setColor('#c7002e')
    .setDescription(`Our backend returned the following information!\n\n${data}\n\n[Plain JSON Link](http://services.plaguecraft.xyz:3000/api/sw_player/findOne?_where(player_name,eq,${args}))\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.`)
    .setFooter('PCN Backend')
    .setTimestamp();
      	
        message.channel.send(econEmbed);
        console.log(`${message.author} got the following data from the REST API:`, data)
      })
    }
  )
  .end()
		} else if (args[0] === 'skywars') {
			if(!args[1]) {
				return message.reply(`you didn't specify a user to lookup in our REST API!`);
			}

			const user = args.slice(1).join(' ');

	http
 	.request(
    		{
      hostname: "services.plaguecraft.xyz", // url of api blah blah blah
      port: "3000",
      path: `/api/sw_player/findOne?_where=(player_name,eq,${user})`
    },
    res => {
      let data = ""

      res.on("data", d => {
        data += d
      })
      res.on("end", () => {
    const swEmbed = new Discord.MessageEmbed()
    .setTitle('PlagueCraft Network Backend Lookup')
    .setThumbnail('https://plaguecraft.xyz/assets/img/logo.png')
    .setColor('#c7002e')
    .setDescription(`Our backend returned the following information!\n\n${data}\n\n[Plain JSON Link](http://services.plaguecraft.xyz:3000/api/sw_player/findOne?_where(player_name,eq,${args}))\n\nIf you have any questions, check out our [Bot FAQ](https://plaguecraft.xyz/bot-faq) for more info.`)
    .setFooter('PCN Backend')
    .setTimestamp();

      	message.channel.send(swEmbed);
        console.log(`${message.author} got the following data from the REST API: swlookup executed >`, data)
      })
    }
  )
  .end()
		}
	}
}