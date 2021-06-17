module.exports = {
    name: 'give',
    async execute(client, Discord, message, args, fetch, math) {
        const member = message.mentions.users.first();
        const memberTarget = message.guild.members.cache.get(member.id);
        const api = `http://rest.plaguecraft.xyz/v0/discord/bal?user=${message.author.id}`
        const uapi = `http://rest.plaguecraft.xyz/v0/discord/bal?user=${memberTarget.id}`
        const postapi = `http://rest.plaguecraft.xyz/v0/discord/balance/post`
        const u = await fetch(uapi).then(response => response.json());
        const { response } = await fetch(api).then(response => response.json());

        if(member === message.author) {
            return message.reply(`You can't pay yourself!`)
        }

        if (response[0].balance === 0) {
            return message.reply(`You're broke! You need to work to get money to pay people!`)
        }

        if (args[1] > response[0].balance) {
            return message.reply(`You don't have enough money to pay ${memberTarget} $${args[1]}! Your current balance is $${response[0].balance}.`)
        }

        const takeaway = math.subtract([`${response[0].balance}`], `${args[1]}`)
        const add = math.add([`${args[1]}`], `${u.response[0].balance}`)

        message.channel.send(`You just gave ${args[0]} $${args[1]}. Your balance is now $${takeaway}.`)

        const params = {
            "user": `${message.author.id}`,
            "balance": takeaway
        }

        const params2 = {
            "user": `${memberTarget.id}`,
            "balance": add
        }

        // Post new balance
            await fetch(postapi, {
                method: 'POST',
                body: JSON.stringify(params),
                headers: { 'Content-type': 'application/json' }
            }).then(response => response.json())
            .then(json => console.log(json))

            // Post other users new balance
            await fetch(postapi, {
                method: 'POST',
                body: JSON.stringify(params2),
                headers: { 'Content-type': 'application/json' }
            }).then(response => response.json())
            .then(json => console.log(json))
    }
}