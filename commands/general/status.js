module.exports = {
	name: 'status',
	description: "Gets the status of supplied server",
	async execute(client, Discord, message, args, fetch, color, thumb) {

        message.channel.send('Getting the status of the server for you, hang tight!')

        const api = `https://api.mcsrvstat.us/2/play.plaguecraft.xyz`;
        const resp = await fetch(api).then(response => response.json());
        console.log(resp)

        if (resp.online === true) {
            console.log(`Used ${api} to get server stats.`)
            const statusEmbed = new Discord.MessageEmbed() // Embed creation
            .setColor(color)
            .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz/`)
            .setTitle('Server Status')
            .addFields(
                {name: 'Server IP', value: 'play.plaguecraft.xyz'}, // Display the IP
                {name: 'Status', value: 'Online!'},
                {name: 'Online Players', value: resp.players.online}, // Player count
                {name: 'Max Players', value: resp.players.max} // Max players allowed at once
            )
            .setTimestamp();
 
            message.channel.send(statusEmbed);
        } else if (resp.online === false) {
            console.log(`Used ${api} to get server stats.`)
            const statusOfflineEmbed = new Discord.MessageEmbed() // Embed creation
            .setColor(color)
            .setTitle('Server Status')
            .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz/`)
            .addFields(
                {name: 'Server IP', value: 'play.plaguecraft.xyz'}, // Display the IP
                {name: 'Status', value: 'Offline :('},
                {name: 'Questions?', value: `Check out our [status page](https://status.plaguecraft.xyz) for updates on any outages!`} // status page link
            )
            .setTimestamp();

            message.channel.send(statusOfflineEmbed)
            }
    	}
	}