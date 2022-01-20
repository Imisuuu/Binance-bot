module.exports = {
  name: 'bal',
  description: 'Sends your balance (for now only ETH).',
  async execute (message){
    binance.balance((error, balances) => {
      if ( error ) return console.error(error);
      let first = 'ETH BALANCE'
      let second = `${balances.ETH.available} ~ ${((balances.ETH.available) * 13229).toFixed(2)} zł `

      if(first == ""){
        first = "None";
      }
      if (second == ""){
        second = "None";
      }

      let mes = client.commands.get('embed').execute('***Balances***', first, second);
      return message.channel.send({embeds: [mes]})
    })
  }
}