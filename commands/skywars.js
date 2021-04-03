const http = require('http');

module.exports = {
	name: 'swlookup',
	description: "Calls a REST API for PlagueCraft Network SkyWars data",
	execute(messages, args) {
		if(!args.length){
			return messages.channel.send(`Hey ${messages.author}, you didn't supply a username! The correct syntax is **pcn!swlookup [mc-username]**.\nNote that if you never played a SkyWars match, you will not be listed here.`)
		}

		http
  		.request(
    		{
      hostname: "", // url of api blah blah blah
      port: "3000",
      path: `/api/sw_player/findOne?_where=(player,eq,${args})`
    },
    res => {
      let data = ""

      res.on("data", d => {
        data += d
      })
      res.on("end", () => {
      	messages.channel.send(`${messages.author}, the PlagueCraft Network Backend returned the following information:\n ${data}`);
        console.log(`${messages.author} got the following data from the REST API: swlookup executed >`, data)
      })
    }
  )
  .end()
	}
}