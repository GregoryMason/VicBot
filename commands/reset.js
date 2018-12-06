const { forbiddenRanks } = require(`../config.json`);
const index = require("../index.js");

module.exports = {
    name: 'reset',
    admin: true,
    args: true,
    description: `Resets the channel and role for a course.`,
    usage: `\`!reset <course>\``,
    async execute(message, args){
        if (!args.length) {
            return message.channel.send(`Please include the name of the channel you wish to reset.`);
        }
    
        else if (args.length > 1) {
            return message.channel.send(`Please only include one rank to reset (no spaces).`);
        }
    
        else if ((message.guild.roles.find(role => role.name === args[0]) == null) && (message.guild.channels.find(channel => channel.name === args[0]) == null)) {
            return message.channel.send(`Cannot find rank to reset.`);
        }
    
        else if (message.guild.channels.find(channel => channel.name === args[0]).parent !== message.guild.channels.find(category => category.name === `papers`)) {
            return message.channel.send(`You can only reset channels in the papers category.`);
        }
    
        else if (forbiddenRanks.includes(args[0])) {
            return message.channel.send(`You probably shouldn't reset this, and at the moment I'm not going to let you.`);
        }
    
        else {
            await index.deleteRank(message, args);
            await index.newRank(message, args);
            return message.channel.send(`Reset ${args[0]}.`);
        }
    }
}