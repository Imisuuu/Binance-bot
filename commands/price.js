const Binance = require('node-binance-api');
global.binance = new Binance().options({
  APIKEY: client.config.key,
  APISECRET: client.config.secret,
  useServerTime: true,
});


module.exports = {
  name: 'price',
  description: 'Sends real time changing price of the requested crypto.',
  async execute (msg, coin){
    let embed = client.commands.get('embed').execute('Desc');
    let mes = await msg.channel.send({embeds: [embed]})
    binance.websockets.prevDay(coin, (error, response) => {
      let symbol = `***${response['symbol'].toUpperCase()} REAL TIME PRICE***`
      let close = ['**Price**:', parseFloat(response['close']).toFixed(2)] 
      let high = ['**High**:', parseFloat(response['high']).toFixed(2)]
      let low = ['**Low**:', parseFloat(response['low']).toFixed(2)]
      let change = ['**%Change**:', parseFloat(response['percentChange']).toFixed(2) + '%']
      let volume = ['**Volume**:', parseFloat(response['volume']).toFixed(2)]

      return client.commands.get('embed').edit(embed, mes, symbol, close[0], close[1], high[0], high[1], low[0], low[1], change[0], change[1], volume[0], volume[1])
      .catch(err => {
        return;
      });
  });
  }
}

