const fs = require('fs');

module.exports = (client, Discord) => {
    const command_files = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

    for(const file of command_files){
        const command = require(`../commands/${file}`);
        if(command.name){
            client.commands.set(command.name, command);
        } else {
            continue;
        }
        
        const moderationCmds = fs.readdirSync('./commands/moderation').filter(file => file.endsWith('.js'));
        for(const file of moderationCmds){
            const command = require(`../commands/moderation/${file}`);
            if(command.name){
                client.commands.set(command.name, command);
            } else {
                continue;
            }

            const minecraftCmds = fs.readdirSync('./commands/moderation').filter(file => file.endsWith('.js'));
            for(const file of minecraftCmds){
                const command = require(`../commands/minecraft/${file}`);
                if(command.name){
                    client.commands.set(command.name, command);
                } else {
                    continue;
                }

                const generalCmds = fs.readdirSync('./commands/general').filter(file => file.endsWith('.js'));
            for(const file of generalCmds){
                const command = require(`../commands/general/${file}`);
                if(command.name){
                    client.commands.set(command.name, command);
                } else {
                    continue;
                    }
                }
            }
        }
    }
}