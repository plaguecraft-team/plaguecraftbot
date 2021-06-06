module.exports = {
    name: 'aticket',
    async execute(client, Discord, message, args, fetch) {
        if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")){
            return message.channel.send('You do not have the permissions to run this command!')
        }
        if (!args[0]) {
            return message.channel.send(`You didn't include a subject for the ticket.`)
        }
        let messageArgs = args.join(' ');

        var params = {
            username: "PCN ATicket",
            avatar_url: "https://plaguecraft.xyz/storage/assets/img/logo.png",
            content: "New Ticket:",
            embeds: [
                {
                    "title": "Ticket Notification!",
                    "thumbnail": {
                        "url": "https://plaguecraft.xyz/storage/assets/img/logo.png",
                    },
                    "description": `${message.author.username} has created a new ticket!\nContents: ${messageArgs}`
                }
            ]
        }

        fetch(process.env.sendURL, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(res => {
            console.log(res);
        }) 

        return message.channel.send('Sent your ticket!')
    }
}