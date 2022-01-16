const { Client} = require('discord.js');
global.client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_BANS"] });
client.config = require('./config')

const chart = require('../commands/chart');
const alert = require('../commands/alert');
const help = require('../commands/help');
const about = require('../commands/about');
const ready = require('../events/ready');
const getCoin = require('../core/coin');

client.on('ready', () => {
    ready();
});

client.on('messageCreate', async (message) => {
    //variables

    if(message.author.bot) return;
    if(!message.content.startsWith(client.config.prefix)) return;
    const [command, ...args] = message.content
        .trim()
        .substring(client.config.prefix.length)
        .split(/\s+/); //regular expression

    let coin = getCoin(args, command);
   
    if(command == 'alert'){
        alert(args, coin, message);
    }
        else if(command == 'chart'){
        const msg = await message.channel.send('--');
        chart(msg, coin);
        
    }
    else if (command == 'help'){
        help(message);
    }
    else if (command === 'about'){
        about(message);
    }
});

client.login(client.config.token);

