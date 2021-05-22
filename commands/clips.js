module.exports = {
    name: 'clips',
    async execute(client, Discord, message, args, fetch) {
        const apiurl = `https://developers.medal.tv/v1/latest?userId=215577&limit=1`;
        const { contentObjects } = await fetch(apiurl, {
            method: 'GET',
            headers: { 'Authorization': process.env.medaltoken, 'Content-Type': 'application/json' }
        }).then(response => response.json())

        const latestEmbed = new Discord.MessageEmbed()
        .setAuthor(contentObjects[0].credits)
        .setTitle(contentObjects[0].contentTitle)
        .setImage(contentObjects[0].contentThumbnail)
        .setURL(contentObjects[0].directClipUrl)
        .addFields(
            { name: 'Likes', value: contentObjects[0].contentLikes },
            { name: 'Views', value: contentObjects[0].contentViews },
            { name: 'Link', value: contentObjects[0].directClipUrl, inline: true },
        )
        message.channel.send(latestEmbed);
    }
}