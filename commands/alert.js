const WebSocket = require('ws');

const alert = async (args, coin, message) => {
    let ws = new WebSocket(`wss://stream.binance.com:9443/ws/${coin}@trade`);

    let num = 0;
    if(num != 0) return;
    if(args[1] === undefined || !Number(args[1]))
        return message.reply('Please provide a number.');
    message.react('👍');
    ws.onmessage = (event) => {
        if(num === 1) return;
        let stockObject = JSON.parse(event.data);
        if(stockObject.p >= args[1]){
            message.reply('Sell now!');
            return num = 1;
        }
    }
} 

module.exports = alert;