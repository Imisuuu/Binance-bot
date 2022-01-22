<h1>Binance Price Bot</h1>

## Table of contents
* [General info](#general-info)
* [Issues](#issues)
* [Technologies](#technologies)
* [Setup](#setup)
* [Run](#run)
* [Commands](#commands)


## General info
<h4>This is just a simple discord bot, which uses the Binance API to get prices.</h4>

## Issues
* If you get an `[Symbol(code)]: 'EMBED_FOOTER_TEXT'` error, change `.setFooter({text:'by Imisuuu😊'})` in embed.js file to `.setFooter('by Imisuuu😊')`.

## Technologies
Project is created with:
* discord.js: 13.6.0
* node-binance-api: 0.13.1
* nodemon: 2.0.15

## Setup
```
$ cd ../Binance-bot
$ npm i discord.js
$ npm i node-binance-api
$ npm i nodemon
```
Then edit the `config.js` file which is in the `./src` directory.

* token: discord bot token => https://discord.com/developers/docs/game-sdk/applications
* prefix: bot prefix
* key: binance API key
* secret: binance API secret key
* playing: playing status of the bot

## Run
```
$ npm run dev
```

## Commands
<h3>For instance I'll use $ as a prefix.</h3>

`$price/getPrice`
</br>_Sends prices, %change etc. of the pair_
</br>**Usage:** $chart <pair>
</br>**Example:** $chart etheur(eth/eur)

`$alert`
</br>_Alerts command author when the (btcbusd) price is greater or equal to (51000)_
</br>**Usage:** $alert <pair> <alert price>
</br>**Example:** $alert btcbusd(btc/busd) 51000

`$bal/balance`
</br>_Sends an ETH balance from the Binance API (currently only ETH - bug in library)_
</br>**Usage:** $bal/$balance

`$help`
</br>_Sends a full list of commands_
</br>**Usage:** $help

`$about`
</br>_Sends information about the author_
</br>**Usage:** $about


## Thank you all for using this bot :)
* If you like it please leave a star and fork it.
* If you run across any issue please create a new issue.
