module.exports = {
	name: 'econlookup',
	description: 'PCN Econ Backend Lookup Command',
	async execute(message, args, Discord, http) {
		if(!args.length) {
			return message.channel.send(`Hey ${message.author}, you didn't supply a username! The correct syntax is **pcn!econlookup [mc-username]**.\nNote that if you never joined the SMP server, you will not be listed here.`)
		}

	http
  	.request(
    {
      hostname: "services.plaguecraft.xyz", // url for backend rest api
      port: "3000", // port for backend api
      path: `/api/xconomy/findOne?_where=(player,eq,${args})` // path for backend api, all same in skywars.js
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
	
	}
}