module.exports = {
    name: 'balance',
    async execute(client, Discord, message, args, fetch) {
        if(!message.member.roles.cache.some(r => r.name === "EconReg")){
            return message.channel.send(`You're not registered! Run **pcn!register** to get started!`)
        }
        const api = `http://localhost:1337/v0/discord/users?user=${message.author.id}`
        const { users } = await fetch(api).then(response => response.json());
        return message.reply(`Your current balance is $${users[0].balance}`)
    }
}