const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
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
        fetch("https://api.plaguecraft.xyz/auth?ign=" + args[0] + "&token=" + args[1] + "&id=" + interaction.user.id, {
            method: "post"
        }).then(async function (response) {
            const j = await response.json();
            if (response.status == 200) return interaction.reply("Great, you've been linked to **" + args[0] + "**!");
            else if (response.status == 409) return interaction.reply({ content: `Uh oh! API returned "${j.message}"!`, ephemeral: true});
            else return interaction.reply({ content: `Uh oh! Something went wrong:\n${JSON.stringify(j)}`, ephemeral: true });
        })
    }
}