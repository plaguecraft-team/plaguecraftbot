const { SlashCommandBuilder } = require('@discordjs/builders');
const { isAuth,linkUser } = require('../modules/wrapper');
module.exports = {
    name: 'link',
    data: new SlashCommandBuilder()
        .setName("link")
        .setDescription("Link your Discord account to your Minecraft account!")
        .addStringOption(option =>
            option
                .setName("ign")
                .setDescription("Your IGN")
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName("token")
                .setDescription("The token provided by the server")
                .setRequired(true)),
    info: {
        "name": 'Link',
        "description": "Link your Discord account to your Minecraft account!",
        "usage": "/link [ign] [token]",
        "requireArgs": true
    },
    async execute(interaction, args, author) {
        if (!await isAuth(author.id)) {
            if (await linkUser(author.id, args[1], args[0])) {
                return interaction.reply({content: `Great, you're now linked to **${args[0]}**!`, ephemeral:true })
            } else return interaction.reply({content: 'Uh oh! Something went wrong when linking you. Make sure your token is correct.', ephemeral:true })
        } else return interaction.reply({content: `Uh oh! You're already linked to an account.`, ephemeral:true })
    }
}