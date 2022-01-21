<h1>Binance Price Bot</h1>
<h3>This is just a simple discord bot, which uses the Binance API to get prices.</h3>

If you have just cloned this project, edit the `config.js` file which is in the `./src` directory.
<h2>First step</h2>
<ul>
  <li> token: this is your discord bot token, you can find it here : https://discord.com/developers/docs/game-sdk/applications</li>
  <li> prefix: this is the bot prefix, I presonally like $</li>
  <li> key: this is your binance api key, you need to create a binance account</li>
  <li> secret: this is your binance api secret key (this is only visible for the first time on binance website!)</li>
  <li> playing: this is the playing status of the bot
</ul>

<h2>Commands</h2>
<h3>For instance I'll use $ as a prefix.</h3>
<ul>
  <li>
    Usage: $chart <pair>
    </br>Example: $chart etheur(eth/eur)
    </br>Sends prices, %change etc. of the pair
  </li>
  <li>
    Usage: $alert <pair> <alert price>
    </br>Example: $alert btcbusd(btc/busd) 51000
    </br>Alerts discord user that used this command when (btcbusd) price is greater or equal to (51000)
  </li>
  <li>
    Usage: $bal/$balance
    </br>Sends an ETH balance from the Binance API (currently only ETH - bug in library)
  </li>
  <li>
    Usage: $help
    </br>Sends a full list of commands
  </li>
  <li>
    Usage: $about
    </br>Sends information about the author
  </li>
</ul>

<h2>Thank you all for using this bot :)</h2>
If you like it please leave a star and fork it.
If you run across any issue please create a new issue.
