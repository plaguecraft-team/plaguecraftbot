module.exports = {
    name: 'announce',
    execute(client, Discord, message, args, ms) {

        if(!message.member.roles.cache.some(r => r.name === "Server Admin")){
			return message.channel.send('You do not have the permissions to run this command!')
		}

        if(!args[0]) {
            return message.reply(`You need to specify what you want to do with this announcement!\n\n*Hint*: schedule, send, testsend`)
        }

        if(args[0] === 'schedule') {

            const announcement = args.slice(2).join(' ');
            message.channel.send(`Scheduled your announcement to go live in ${ms(ms(args[1]))}!`)
            const annoucementsChannel = client.channels.cache.find(channel => channel.name === "🔊announcements🔊")


            setTimeout(function () {
                annoucementsChannel.send(`${announcement}\n\n ~ ${message.author.username}`)
            }, ms(args[1]));

        } else if (args[0] === 'send') {
            const announcement = args.slice(1).join(' ');
            const annoucementsChannel = client.channels.cache.find(channel => channel.name === "🔊announcements🔊")
            annoucementsChannel.send(`${announcement}\n\n ~ ${message.author.username}`)

        } else if (args[0] === 'testsend') {
            const announcement = args.slice(1).join(' ');
            message.channel.send(`${announcement}\n\n ~ ${message.author.username}`);

        }
    }
}