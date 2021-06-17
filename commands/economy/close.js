module.exports = {
    name: 'close',
    async execute(client, Discord, message, args, fetch) {
        if(!message.member.roles.cache.some(r => r.name === "EconReg")){
            return message.reply(`You have to be registered to close your account!`)
        }
        message.reply('This action is **permanent** and no one on the PCN Team can reverse this deletion/closure of your PCNEcon account.\n**Are you sure you want to do this?**\n Respond with **YES** if you are sure. Respond with **NO** to cancel.')
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
        // console.log(collector)
        collector.on('collect', async message => {
            if (message.content == "YES") {
                const delapi = `http://localhost:1337/v0/discord/user/delete`
                var params = {
                    "user": `${message.author.id}`
                }

                try{
                    // Remove user data
                    const rm = await fetch(delapi, {
                        method: 'DELETE',
                        body: JSON.stringify(params),
                        headers: { 'Content-type': 'application/json' }
                    }).then(response => response.json())
                    .then(json => console.log(json))

                    let role = message.member.guild.roles.cache.find(role => role.name === "EconReg");
                    if (role) message.guild.members.cache.get(message.author.id).roles.remove(role);

                    return message.reply(`**We're sorry to see you go!**\nYour account has been closed. Let us know if you have any feedback.`)
                }
                catch(err) {
                    message.reply(`Sorry, but something went wrong when closing your account. Please contact a team member to have your account manually deleted.`)
                    console.log(err)
                }

            } else if (message.content == "NO") {
                return message.reply(`Account deletion cancelled.`)
            }
        })
    }
}