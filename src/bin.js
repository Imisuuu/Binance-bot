const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: '7dAWajOtPQn7l2zr86VQxuLey8eeZaTiYOzR82QPnasVRwNQL1blqVkx19fHsO2S',
  APISECRET: 'I34VA1lb1tAqSkMbKhRQJFvJv0nIG5YLj53TbRhpfx2lXGKeeMjMzWp7vY3ImIGo'
});

async function func(){
  binance.prevDay("ETHEUR", (error, prevDay, symbol) => {
    console.info(symbol+" previous day:", prevDay);
  });
}