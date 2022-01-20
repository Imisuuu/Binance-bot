const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'embed',
    description: 'Sends an embed',

    execute(...args) {
        const embed = new MessageEmbed()
        .setColor('#FFD700')
        .setFooter('by Imisuuu😊')
        if(args[0] !== 'nodesc'){
            embed.setDescription(args[0])
        }

        //If arguments length is odd then it doesn't create the last Field
        if(args.length % 2 == 0){
            for(i=1;i<args.length;i+=2){
                embed.addField(args[i], args[i+1]);
            }
        } else {
            for(i=1;i<args.length-1;i+=2){
                embed.addField(args[i], args[i+1]);
            }
        }
        return embed; 
    },
    edit(embed, msg, ...args){
        let embedCopy = embed;
        embedCopy.fields = [];
        if(args[0] !== 'nodesc'){
            embedCopy.setDescription(args[0]);
        }

        if(args.length % 2 == 0){
            for(i=1;i<args.length;i+=2){
                embedCopy.addField(args[i], args[i+1]);
            }
        } else {
            for(i=1;i<args.length-1;i+=2){
                embedCopy.addField(args[i], args[i+1]);
            }
        }
        return msg.edit({embeds: [embedCopy]}); 
    }
}