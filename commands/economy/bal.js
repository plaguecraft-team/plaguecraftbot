module.exports = {
    name: 'balance',
    async execute(client, Discord, message, args, fetch) {
        const api = `http://rest.plaguecraft.xyz/v0/discord/users?user=${message.author.id}`
        const { users } = await fetch(api).then(response => response.json());
        return message.reply(`Your current balance is $${users[0].balance}`)
    }
}