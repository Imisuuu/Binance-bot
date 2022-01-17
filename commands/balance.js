module.exports = {
  name: 'bal',
  description: 'chart command',
  async execute (message){
    binance.balance((error, balances) => {
      if ( error ) return console.error(error);
      message.channel.send(`ETH: ${balances.ETH.available} ~ ${((balances.ETH.available) * 13229).toFixed(2)} zł`);
    })
  }
}