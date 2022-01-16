const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: client.config.key,
  APISECRET: client.config.secret,
});


const chart = async (msg, coin) => {
    try{
        binance.websockets.prevDay(coin, (error, response) => {
        if(response['close'] > 1){
            return msg.edit(
`>>> ***${response['symbol'].toUpperCase()} PRICE IN 24H***
**Price**: ${parseFloat(response['close']).toFixed(2)}
**High**: ${parseFloat(response['high']).toFixed(2)}
**Low**: ${parseFloat(response['low']).toFixed(2)}
**%Change**: ${parseFloat(response['percentChange']).toFixed(2)}%
**Volume**: ${parseFloat(response['volume']).toFixed(2)}`);
        }else if (response['close'] <= 1){
            return msg.edit(
`>>> ***${response['symbol'].toUpperCase()} PRICE IN 24H***
**Price**: ${response['close']}
**High**: ${response['high']}
**Low**: ${response['low']}
**%Change**: ${parseFloat(response['percentChange']).toFixed(2)}%
**Volume**: ${parseFloat(response['volume']).toFixed(2)}`);
        } else { //nie dziala
            return message.reply('This crypto has not been found in the database.');
        }
        
      });
    } catch (err){
        console.log(`Huston we got a problem: ${err}`);
        }
}

module.exports = chart;


