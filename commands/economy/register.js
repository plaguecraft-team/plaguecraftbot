module.exports = {
    name: 'register',
    async execute(client, Discord, message, args, fetch) {

        const api = `http://rest.plaguecraft.xyz/v0/discord/user?user=${message.author.id}`
        const postapi = `http://localhost:1337/v0/discord/user/post`
        const { response } = await fetch(api).then(response => response.json())

        if(message.member.roles.cache.some(r => r.name === "EconReg")){
            return message.channel.send(`You're already registered!`)
        }

            try{
                const params = {
                    "user": `${message.author.id}`,
                    "balance": 100
                }
        
                    // Post new user
                    const post = await fetch(postapi, {
                        method: 'POST',
                        body: JSON.stringify(params),
                        headers: { 'Content-type': 'application/json' }
                    }).then(response => response.json())
                    .then(json => console.log(json))
                
                message.reply(`Successfully signed up! You now have $100 to your name :)`)

                let role = message.member.guild.roles.cache.find(role => role.name === "EconReg");
                if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
            }
            catch(err) {
                message.reply(`I couldn't register you due to an error in my backend!`)
                console.log(`Couldn't register a user to the database:`, err)
            }   
    }
}