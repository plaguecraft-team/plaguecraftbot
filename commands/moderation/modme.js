module.exports = {
    name: 'modme',
    async execute(client, Discord, message, args, util) {

        if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")) {
            return message.channel.send(`You don't have the correct permissions to run this command.`)
        } else if (!args[0]) {
            return message.channel.send(`You need to specify your Minecraft username!`)
        }

        const mcClient = new util.RCON(`${process.env.ip}`, { port: 8031, enableSRV: false, timeout: 5000, password: `${process.env.rconpass}` }); // These are the default options

        mcClient.on('output', (opt) => {
            message.reply(`Command sent & done.`)
            mcClient.close();
        });

        mcClient.connect()
            .then(() => mcClient.run(`lp user ${args[0]} parent set moderator`)) // List all players online
            .catch((error) => {
                console.error(error);
            });
    }
}