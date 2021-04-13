module.exports = {
    name: 'apis',
    description: 'Lists all of the APIs and NPM Packages this project uses',
    execute(message, args, Discord, client) {

        const apiEmbed = new Discord.MessageEmbed()
        .setTitle(`PlagueCraftBot APIs`)
        .setThumbnail(`https://plaguecraft.xyz/assets/img/logo.png`)
        .setDescription(`This command contains info about our bot, what we use and how it runs.\n\nEnvironment - [Node.js](https://nodejs.org)\n\nWe use multiple [NPM](https://npmjs.com) (Node Package Manager) packages and APIs to allow this bot to run to its fullest.\n\n[minecraft-information](https://www.npmjs.com/package/minecraft-information)\n[ms](https://www.npmjs.com/package/ms)\n[discord.js](https://www.npmjs.com/package/discord.js)\n[request](https://www.npmjs.com/package/request)\nThe PlagueCraft Network Backend API\n[Minotar Minecraft Avatar API](https://minotar.net)`)
        .setColor(`#c7002e`)
        .setFooter(`PCN`)
        .setTimestamp(); 

        message.channel.send(apiEmbed);
    }
}