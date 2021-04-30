const util = require('minecraft-server-util');

module.exports = {
	name: 'status',
	description: "Gets the status of supplied server",
	execute(client, Discord, message, args, util) {

        util.status(`play.plaguecraft.xyz`).then((response) =>{ // Server URL

            console.log(`Server was fetched!`, response); // Log when server was fetched then display the response 

            const statusEmbed = new Discord.MessageEmbed() // Embed creation
            .setColor('#c7002e')
            .setTitle('Server Status')
            .setThumbnail('https://plaguecraft.xyz/storage/assets/img/logo.png')
            .addFields(
                {name: 'Server IP', value: response.host}, // Display the IP
                {name: 'Online Players', value: response.onlinePlayers}, // Player count
                {name: 'Max Players', value: response.maxPlayers}, // Max players allowed at once
                {name: 'Questions?', value: `Check out our [status page](https://status.plaguecraft.xyz) for updates on any outages!`} // status page link
            )
            .setFooter('PCN Server Status')
            .setTimestamp();
 
            message.channel.send(statusEmbed);
        })
        .catch ((error) =>{
            const offlineEmbed = new Discord.MessageEmbed() // If the server doesn't respond, this is returned.
            .setColor('#c7002e')
            .setTitle('Server Status')
            .setThumbnail('https://plaguecraft.xyz/storage/assets/img/logo.png')
            .setDescription(`I tried to fetch the status of the network, however it returned nothing!\n\nIt's possible this is a server issue. If you have trouble logging in, create a Discord ticket here.\nAlso check the [status page](https://status.plaguecraft.xyz) in case it is an ongoing issue.`)
            .setFooter('PCN Server Status')
            .setTimestamp();

            message.channel.send(offlineEmbed)
            throw error;
        	})
    	}
	}