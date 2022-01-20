const { Client, Collection } = require('discord.js');
global.client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_BANS"] });
client.config = require('./config');

const commands = require('../handlers/commands');


client.on('ready', () => {
    commands(Collection);
    client.commands.get('ready').execute();
});

client.on('messageCreate', async (message) => {
    if(message.author.bot) return;
    
    if(!message.content.startsWith(client.config.prefix)) return;
    
    const [command, ...args] = message.content
        .trim()
        .substring(client.config.prefix.length)
        .split(/\s+/); //regular expression

    let coin = client.commands.get('getCoin').execute(args, command, message);
   
    if(command == 'alert'){
        client.commands.get('alert').execute(args, coin, message);
    }
    else if(command == 'chart'){
        client.commands.get('chart').execute(message, coin);
        
    }
    else if (command == 'help'){
        client.commands.get('help').execute(message);
    }
    else if (command === 'about'){
        client.commands.get('about').execute(message);
    }
    else if (command === 'balance' || command === 'bal'){
        client.commands.get('bal').execute(message);
    }
});

client.login(client.config.token);

