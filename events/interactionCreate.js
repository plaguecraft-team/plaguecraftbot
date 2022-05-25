const Discord = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    on: true,
    async execute(interaction) {
        if(!interaction.isCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);

            try {
                var cmd = require(`../commands/${interaction.commandName}.js`)

                if(cmd.info.requireArgs === true) {
                    // Arguments
                    var args = [];
                    await Object.keys(interaction.options._hoistedOptions).forEach(function(key) {
                        args.push(interaction.options._hoistedOptions[key].value);
                    });

                    command.execute(interaction, args, interaction.user);
                } else command.execute(interaction, interaction.user);
            } catch (error) {
                console.log(error)
                await interaction.reply({ content: 'There was an error while executing this command!\n**Error:** ' + '`' + error.message + '`' });
            }
    }
}