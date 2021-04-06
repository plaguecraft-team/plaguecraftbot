const http = require('http');

module.exports = {
	name: 'swlookup',
	description: "Calls a REST API for PlagueCraft Network SkyWars data",
	execute(message, args, Discord) {
		
    if(!args.length){
			return message.channel.send(`Hey ${message.author}, you didn't supply a username! The correct syntax is **pcn!swlookup [mc-username]**.\nNote that if you never played a SkyWars match, you will not be listed here.`)
		}

		http
  		.request(
    		{
      hostname: "services.plaguecraft.xyz", // url of api blah blah blah
      port: "3000",
      path: `/api/sw_player/findOne?_where=(player_name,eq,${args})`
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
