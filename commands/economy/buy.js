module.exports = {
    name: 'buy',
    async execute(client, Discord, message, args, fetch, math) {
        if(!args[0]) {
            return message.channel.send(`You didn't even select the item you wanted to purchase!`)
        } else if (!message.member.roles.cache.some(r => r.name === "EconReg")){
            return message.channel.send('You need to register (pcn!register) before you can use any economy commands.')
        }

        const items = `http://rest.plaguecraft.xyz/v0/discord/items?item=${args[0]}`
        const uapi = `http://rest.plaguecraft.xyz/v0/discord/users?user=${message.author.id}`
        const postitems = `http://rest.plaguecraft.xyz/v0/discord/computer/post`
        const postbal = `http://rest.plaguecraft.xyz/v0/discord/balance/post`

        const { users } = await fetch(uapi).then(response => response.json());

        if (args[0] === 'computer' && users[0].balance > 300 && users[0].computer === 0) {

            const takeaway = math.subtract([`${users[0].balance}`], `300`)

            const params = {
                "user": `${message.author.id}`,
                "computer": true
            }

            const paramsbal = {
                "user": `${message.author.id}`,
                "balance": takeaway
            }

                    // Post new item count
                    const comp = await fetch(postitems, {
                        method: 'POST',
                        body: JSON.stringify(params),
                        headers: { 'Content-type': 'application/json' }
                    }).then(response => response.json())
                    .then(json => console.log(json))

                    const bal = await fetch(postbal, {
                        method: 'POST',
                        body: JSON.stringify(paramsbal),
                        headers: { 'Content-type': 'application/json' }
                    }).then(response => response.json())
                    .then(json => console.log(json))

                    return message.channel.send(`You just bought a computer, unlocking new possibilities!\nYour balance is now ${takeaway}.`)

        } else if (args[0] === 'computer' && users[0].balance < 300) {
            return message.reply(`You don't have enough money for this item!`)
        } else if (users[0].computer === 1) {
            return message.reply(`You already have a computer.. and it isn't broken!`)
        }
    }
}