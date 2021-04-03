module.exports = {
	name: 'clear',
	description: "Clears Text",
    async execute(messages, args) {
        if(!args[0]) return message.reply("Please enter the ammount of messages to clear!");
        if(isNaN(args[0])) return message.reply("Please use a real number!");

        if(args[0] > 100) return message.reply("100 is the max number of messages at once!");
        if(args[0] < 1) return message.reply("This value is too small, it must be bigger than 1!");

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages)
        })
    }


}