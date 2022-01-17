module.exports = {
    name: 'help',
    description: 'chart command',
    async execute (msg) {
        await msg.channel.send(
` ***         HELP ***
>>> **Commands**:
\n**chart**: $chart {coin, for instance eth/eur or etheur} - real time symbol price 
**alert**: $alert {coin} {price} - function triggers when current coin price is equal or higher that price you typed
\n\nThe author is **Imisuuu**`
            
        );
    }
}