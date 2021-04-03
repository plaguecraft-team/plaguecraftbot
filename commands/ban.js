module.exports = {
	name: 'ban',
	description: "PCN Ban Command",
	execute(messages, args){
		
		if(messages.member.roles.cache.some(r => r.name === "Mod Bot User")){
					const member = messages.mentions.users.first();

		if(member){
			const memberTarget = messages.guild.members.cache.get(member.id);
			memberTarget.ban();
			messages.reply(`<@${memberTarget.id}> has been banned.`)
		}else{
			messages.reply(`That member could not be banned! Either you didn't specify a user, or they've already been banned!`)
		}
		
		} else {
			messages.reply('You do not have the permissions to run this command!')
		}
	}
}