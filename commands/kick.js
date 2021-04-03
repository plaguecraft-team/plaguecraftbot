module.exports = {
	name: 'kick',
	description: "PCN Kick Command",
	execute(messages, args){
		
		if(messages.member.roles.cache.some(r => r.name === "Mod Bot User")){
					const member = messages.mentions.users.first();

		if(member){
			const memberTarget = messages.guild.members.cache.get(member.id);
			memberTarget.kick();
			messages.channel.send(`User ${memberTarget} has been kicked.`)
		}else{
			messages.channel.send(`That member could not be kicked! Either you didn't specify a user, or they've already been kicked!`)
			}
		} else{
			messages.reply('You do not have the permissions to use this command!')
		}
	}
}