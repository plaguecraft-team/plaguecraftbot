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
            message.channel.send(`I couldn't query the server! Either it is offline or I'm broken!. Check https://status.plaguecraft.xyz for more info!`);
            throw error;
        	})
    	}
	}