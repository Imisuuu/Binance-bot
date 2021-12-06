require('dotenv').config();
const WebSocket = require('ws');
const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: process.env.KEY,
  APISECRET: process.env.SECRET
});

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

            let coin = undefined;
            if(CMD_NAME === 'help'){}          
            else if (args[0] != undefined) {
                if(args[0].includes('/')){
                    const word = args[0].split('/');
                    coin = `${word[0]}${word[1]}`;
                }else {
                    coin = args[0];
                }
            } else {
                return await message.reply('You need to put arguments, check $help function.');
            }
        
        if(CMD_NAME === 'alert'){
            let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${coin}@trade`);
            
            let num = 0;
            if(num != 0) return;
            console.log(typeof(args[1]));
            if(args[1] === undefined || !Number(args[1]))
                return message.reply('Please provide a number.');
            ws.onmessage = (event) => {
                if(num === 1) return;
                let stockObject = JSON.parse(event.data);
                if(stockObject.p >= args[1]){
                    message.reply('Sell now!');
                    return num = 1;
                }
            }
        }
         else if(CMD_NAME === 'chart'){
            const msg = await message.channel.send('--');

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
        else if (CMD_NAME === 'help'){
            await message.channel.send(
`>>> Binance price bot has only 2 functions now, here is how to use them:
\n**chart**: $chart {coin, for instance eth/eur or etheur} - real time symbol price 
\n**alert**: $alert {coin} {price} - function triggers when current coin price is equal or higher that price you typed`
                );
        }
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);

