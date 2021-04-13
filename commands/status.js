module.exports = {
	name: 'status',
	description: "Gets the status of supplied server",
	execute(message, args, Discord, client, util) {

        util.status(`play.plaguecraft.xyz`).then((response) =>{

            console.log(`Server was fetched!`, response);

            const statusEmbed = new Discord.MessageEmbed()
            .setColor('#c7002e')
            .setTitle('Server Status')
            .setThumbnail('https://plaguecraft.xyz/assets/img/logo.png')
            .addFields(
                {name: 'Server IP', value: response.host},
                {name: 'Online Players', value: response.onlinePlayers},
                {name: 'Max Players', value: response.maxPlayers},
                {name: 'Questions?', value: `Check out our [status page](https://status.plaguecraft.xyz) for updates on any outages!`}
            )
            .setFooter('PCN Server Status')
            .setTimestamp();
 
            message.channel.send(statusEmbed);
        })
        .catch ((error) =>{
            const offlineEmbed = new Discord.MessageEmbed()
            .setColor('#c7002e')
            .setTitle('Server Status')
            .setThumbnail('https://plaguecraft.xyz/assets/img/logo.png')
            .setDescription(`I tried to fetch the status of the network, however it returned nothing!\n\nIt's possible this is a server issue. If you have trouble logging in, create a Discord ticket here.\nAlso check the [status page](https://status.plaguecraft.xyz) in case it is an ongoing issue.`)
            .setFooter('PCN Server Status')
            .setTimestamp();

            message.channel.send(offlineEmbed)
            throw error;
        	})
    	}
	}