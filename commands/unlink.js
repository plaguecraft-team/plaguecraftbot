const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
module.exports = {
    name: 'unlink',
    data: new SlashCommandBuilder()
        .setName("unlink")
        .setDescription("Unlink your Discord account from your Minecraft account!"),
    info: {
        "name": 'Unlink',
        "description": "Unlink your Discord account from your Minecraft account!",
        "usage": "/unlink",
        "requireArgs": false
    },
    async execute(interaction, author) {
        fetch("https://api.plaguecraft.xyz/auth?id=" + interaction.user.id, {
            method: "delete"
        }).then(async function (response) {
            const j = await response.json();
            if (response.status == 200) return interaction.reply("Great, you've been unlinked!");
            else if (response.status == 404) return interaction.reply({ content: `Uh oh! API returned "${j.message}"!`, ephemeral: true});
            else return interaction.reply({ content: `Uh oh! Something went wrong:\n${JSON.stringify(j)}`, ephemeral: true });
        })
    }
}