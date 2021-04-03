const http = require('http');

module.exports = {
	name: 'econlookup',
	description: "Displays backend statistics for the PC Network",
	execute(messages, args) {
		if(!args.length) {
			return messages.channel.send(`Hey ${messages.author}, you didn't supply a username! The correct syntax is **pcn!econlookup [mc-username]**.\nNote that if you never joined the SMP server, you will not be listed here.`)
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
      	messages.channel.send(`${messages.author}, the PlagueCraft Network Backend returned the following information:\n ${data}`);
        console.log(`${messages.author} got the following data from the REST API:`, data)
      })
    }
  )
  .end()
	}
}
