const WebSocket = require('ws');

module.exports = {
    name: 'alert',
    description: 'Triggers when crypto price is grater or equal than requested price.',
    async execute (args, coin, message) {
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
                let mes = client.commands.get('embed').execute('nodesc', '***Alert***' , `${message.author} Sell Now!`)
                message.channel.send({embeds: [mes]}).catch(err => {return num = 1;})
                num = 1;
            }
        }
    }
}