const Binance = require('node-binance-api');
global.binance = new Binance().options({
  APIKEY: client.config.key,
  APISECRET: client.config.secret,
  useServerTime: true,
});


module.exports = {
  name: 'chart',
  description: 'Chart command',
  async execute (msg, coin, message){
    binance.websockets.prevDay(coin, (error, response) => {
      return msg.edit(
`>>> ***${response['symbol'].toUpperCase()} PRICE IN 24H***
**Price**: ${parseFloat(response['close']) > 1 ? parseFloat(response['close']).toFixed(2) : parseFloat(response['close'])}
**High**: ${parseFloat(response['high']) > 1 ? parseFloat(response['high']).toFixed(2) : parseFloat(response['high'])}
**Low**: ${parseFloat(response['low']) > 1 ? parseFloat(response['low']).toFixed(2) : parseFloat(response['low'])}
**%Change**: ${parseFloat(response['percentChange']).toFixed(2)}%
**Volume**: ${parseFloat(response['volume']).toFixed(2)}`)
      .catch(() => {
        return;
      });
        
  });
  }
}

