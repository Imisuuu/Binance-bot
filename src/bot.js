require('dotenv').config();
const WebSocket = require('ws');
const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: process.env.KEY,
  APISECRET: process.env.SECRET
});

//npm run dev - start bot

const { Client} = require('discord.js');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_BANS"] });
const PREFIX = '$';


client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
});

client.on('messageCreate', async (message) => {
    //variables
    
    if(message.author.bot) return;
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/); //regular expression
        if(CMD_NAME === 'kick'){
            if (!message.member.permissions.has('MUTE_MEMBERS'))
                return message.reply('You do not have permissions to use that command.');
            if(args.length === 0) 
                return message.reply('Please provide an ID.');
            const member = message.guild.members.cache.get(args[0]);
            if(member){
                member
                 .kick()
                 .then((member) => message.channel.send(`${member} was kicked.`))
                 .catch((err) => message.channel.send('I cannot kick that user :('));
            } else {
                message.channel.send('That member was not found.');
            }
        }else if (CMD_NAME === 'ban'){
            if (!message.member.permissions.has('BAN_MEMBERS'))
                return message.reply('You do not have permissions to use that command.');
            if(args.length === 0) 
                return message.reply('Please provide an ID.');

            try{
                const user = await message.guild.members.ban(args[0]);
                message.channel.send('User was banned successfully.');
            }catch(err){
                console.log(err);
                message.channel.send('An error occurred. Either I do not have permissions or the user was not found.');
            }
        // }else if(CMD_NAME === 'chart'){
        //     let address = undefined;
        //     if(args[0].includes('/')){
        //         const words = args[0].split('/');
        //         address = `wss://stream.binance.com:9443/ws/${words[0]}${words[1]}@trade`;
        //     }else {
        //         address = `wss://stream.binance.com:9443/ws/${args[0]}@trade`;
        //     }
            
        //     let ws = new WebSocket(address);
        //     const msg = await message.channel.send('---');
        //     ws.onmessage = (event) => {
        //         let stockObject = JSON.parse(event.data);
        //         if(stockObject.p >= 1){
        //             msg.edit(`>>> **ETH/EUR CHART IN REAL TIME**\n${parseFloat(stockObject.p).toFixed(2)} €`);
        //         } else {
        //             msg.edit(`>>> **ETH/EUR CHART IN REAL TIME**\n${stockObject.p} €`);
        //         }
        //     }   
        } else if(CMD_NAME === 'alert'){
            let coin = '';
            if(args[0].includes('/')){
                const slice = args[0].split('/');
                coin = `${slice[0]}${slice[1]}`;
            } else{
                coin = args[0];
            }

            let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${coin}@trade`);

            let num = 0;
            if(num != 0) return;
            if(args.length === 0)
                return message.reply('Please provide a number.');
            ws.onmessage = (event) => {
                if(num === 1) return;
                let stockObject = JSON.parse(event.data);
                if(stockObject.p >= args[1]){
                   message.reply('Sell now!');
                   return num = 1;
                }
            }
        } else if(CMD_NAME === 'chart'){
            let coin = undefined;
            if(args[0].includes('/')){
                const word = args[0].split('/');
                coin = `${word[0]}${word[1]}`;
            }else {
                coin = args[0];
            }
            const msg = await message.channel.send('---');

            binance.websockets.prevDay(coin, (error, response) => {
                if(response['close'] > 1){
                    return msg.edit(
`>>> ***${response['symbol'].toUpperCase()} PRICE IN 24H ***
**Price**: ${parseFloat(response['close']).toFixed(2)}
**High**: ${parseFloat(response['high']).toFixed(2)}
**Low**: ${parseFloat(response['low']).toFixed(2)}
**%Change**: ${parseFloat(response['percentChange']).toFixed(2)}%
**Volume**: ${parseFloat(response['volume']).toFixed(2)}`);
                }else {
                    return msg.edit(
`>>> ***${response['symbol'].toUpperCase()} PRICE IN 24H ***
**Price**: ${response['close']}
**High**: ${response['high']}
**Low**: ${response['low']}
**%Change**: ${parseFloat(response['percentChange']).toFixed(2)}%
**Volume**: ${parseFloat(response['volume']).toFixed(2)}`);
                }
                
              }); 
            
        }
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);

