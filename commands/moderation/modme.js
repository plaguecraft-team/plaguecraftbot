module.exports = {
    name: 'modme',
    async execute(client, Discord, message, args, util, color, thumb) {

        if(!message.member.roles.cache.some(r => r.name === "Mod Bot User")) {
            return message.channel.send(`You don't have the correct permissions to run this command.`)
        } else if (!args[0]) {
            const synEmbed = new Discord.MessageEmbed()
            .setAuthor(`The PlagueCraft Network`, `${thumb}`, `https://plaguecraft.xyz`)
            .setTitle(`pcn!modme`)
            .setColor(color)
            .addFields(
                { name: 'Description', value: 'RCONs into the MC server and mods given user'},
                { name: 'Syntax', value: 'pcn!modme [ign]' },
                { name: 'Missing Field', value: 'No IGN supplied'}
            )

            return message.channel.send(synEmbed)
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