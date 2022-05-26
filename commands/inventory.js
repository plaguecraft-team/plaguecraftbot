const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'inventory',
    data: new SlashCommandBuilder()
        .setName("inventory")
        .setDescription("Update or see your inventory!")
        .addSubcommand(subcommand =>
            subcommand
                .setName("get")
                .setDescription("Get your inventory!")
                .addStringOption(option =>
                    option.setName("ign")
                        .setDescription("Your IGN")
                        .setRequired(true)
                        ))
        .addSubcommand(subcommand =>
            subcommand
                .setName("update")
                .setDescription("Update your inventory")
                .addStringOption(option =>
                    option
                        .setName('ign')
                        .setDescription('Your IGN')
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName("sword")
                        .setDescription("The slot number (0-8) of your item")
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName("concrete1")
                        .setDescription("The slot number (0-8) of your item")
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName("concrete2")
                        .setDescription("The slot number (0-8) of your item")
                        .setRequired(true))
                .addStringOption(option =>
                    option
                    .setName("pickaxe")
                    .setDescription("The slot number (0-8) of your item")
                    .setRequired(true))
                .addStringOption(option =>
                    option
                    .setName("bow")
                    .setDescription("The slot number (0-8) of your item")
                    .setRequired(true))
                .addStringOption(option =>
                    option
                    .setName("gap")
                    .setDescription("The slot number (0-8) of your item")
                    .setRequired(true))
        ),
    info: {
        name: 'inventory',
        description: 'Manage your inventory!',
        usage: "/inventory [get|update] [items]",
        requireArgs: true
    },
    async execute(interaction, args, author) {
        if (args.length == 1) {
            fetch("https://api.plaguecraft.xyz/bridges?username=" + args[0], {
                method: 'get',
                headers: {
                    "content-type": 'application/json'
                }
            }).then(async function(response) {
                if (response.status != 200) return interaction.reply({ 'content': "Hey - you don't exist in the database!", ephemeral: true});
                else {
                    var j = await response.json();
                    const itemData = j.user.itemData

                    const image = await fetch("https://api.plaguecraft.xyz/bridges/image?username=" + args[0], {
                        method: 'get'
                    }).then(response => response.arrayBuffer());

                    const attachment = new MessageAttachment(Buffer.from(image, 'utf-8'), 'hotbar.png');
                    
                    const e = new MessageEmbed()
                    .setTitle(`${args[0]}'s Inventory`)
                    .setAuthor({ name: `${author.username}`, iconURL: author.avatarURL()})
                    .setColor()
                    .setImage(`attachment://hotbar.png`)
                    .addFields(
                        {
                            "name": "⚔",
                            "value": "Slot " + itemData.sword,
                            inline: true
                        },
                        {
                            "name": "⛏",
                            "value": "Slot " + itemData.pickaxe,
                            inline: true
                        },
                        {
                            "name": "🏹",
                            "value": "Slot " + itemData.bow,
                            inline: true
                        },
                        {
                            "name": "Concrete",
                            "value": "Slots " + itemData.concrete1 + " & " + itemData.concrete2,
                            inline: true
                        },
                        {
                            "name": "🍎",
                            "value": "Slot " + itemData.gap,
                            inline: true
                        }
                    )
                    .setFooter({ text: `PlagueCraft Network`, iconURL: `https://plaguecraft.xyz/static/img/logo.png` })
                    .setTimestamp();
                    return interaction.reply({ embeds: [e], files: [attachment] });
                }
            })
        } else {
            const numericcheck = [];
            let boolean = null;
    
            args.forEach((val, ind) => {
                if (args.indexOf(val) != args.lastIndexOf(val)) boolean = true
                if (parseInt(val) > 8) numericcheck.push(parseInt(val));
            })
    
            if (numericcheck.length != 0 || boolean == true) return interaction.reply({ content: 'Hey - you provided a slot # that was bigger than 8 or duplicates!', ephemeral: true});
            else {
                const obj = {
                    "user": args[0],
                    "itemData": {
                        "sword": args[1],
                        "concrete1": args[2],
                        "concrete2": args[3],
                        "pickaxe": args[4],
                        "bow": args[5],
                        "gap": args[6]
                    }
                }

                fetch("https://api.plaguecraft.xyz/bridges/itemData", {
                    method: 'post',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                }).then(async function (response) {
                    const j = await response.json();
                    if (response.status != 200) return interaction.reply({'content': 'Something went wrong!\n' + JSON.stringify(j), ephemeral: true});
                    else return interaction.reply({'content': 'Successfully updated your inventory :)', ephemeral: true});
                })
            }
        }
    }
}