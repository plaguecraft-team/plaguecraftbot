module.exports = {
    name: 'store',
    async execute(client, Discord, message, args, fetch) {
        const storeEmbed = new Discord.MessageEmbed()
        .setTitle(`PlagueCraft Store`)
        .setDescription(``)
        .addFields(
            {name: 'Newspaper', value: `$1`}, // Display the IP
            {name: 'Computer', value: `$300`},
            {name: 'A Singular Chicken Nugget', value: `$2`}, // Player count
            {name: 'Shoes', value: `$30`} // Max players allowed at once
        )
        .setFooter(`PCN`)
        .setTimestamp();

        message.channel.send(storeEmbed)
    }
}