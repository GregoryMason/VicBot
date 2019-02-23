const { aliasRanks } = require(`../config.json`);
const Discord = require(`discord.js`);
const index = require(`../index.js`);

module.exports = {
	name: `alias`,
	args: true,
	admin: false,
	usage: `\`!alias <alias>\``,
	description: `Lists the papers allocated to an alias.`,
	async execute(message, args){
		for (let i = 0; i < args.length; i++){
			if(!message.guild.roles.some(role => role.name === args[i])){
				message.channel.send(`Couldn't find ${args[i]}`);
				continue;
			}
			if(aliasRanks.indexOf(args[i]) === -1){
				message.channel.send(`${args[0]} is not an alias.`);
				continue;
			}
			const role = message.guild.roles.find(role => role.name === args[i]);
			let channels = `\`\`\``;
			let count = 1;
			message.guild.channels.array().forEach(channel => {
				if(role.permissionsIn(channel).has(`VIEW_CHANNEL`)) {
					if(index.isPaper(channel)) {
						channels += channel.name;
						if (count % 4 === 0) channels += `\n`; else channels += `\t`;
						count++;
					}
				}
			});
			channels += `\`\`\``;
			message.channel.send(new Discord.MessageEmbed()
				.setTitle(args[0])
				.setDescription(channels));
		}
	},

};