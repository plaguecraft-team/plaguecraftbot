const { SlashCommandBuilder } = require('@discordjs/builders');
const { isAuth,unlinkUser } = require('../modules/wrapper');
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
        if (await isAuth(author.id)) {
            if (await unlinkUser(author.id)) return interaction.reply({content:`Great, you've been unlinked!`, ephemeral:true});
            else return interaction.reply({content:'Sorry, something went wrong when unlinking your account!', ephemeral:true})
        } else return interaction.reply({ content: `Sorry, you're not linked to an account!`, ephemeral:true });
    }
}