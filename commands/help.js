module.exports = {
    name: 'help',
    description: 'Help command',
    execute (msg) {
        let mes = 
`**Commands**:
||*${client.config.prefix}chart*|| : {coin} - Sends real time changing price of the requested crypto. 
||*${client.config.prefix}alert*|| : {coin} {price} - Triggers when crypto price is grater or equal than requested price.
||*${client.config.prefix}balance*|| : Sends your balance (for now only ETH).
||*${client.config.prefix}about*|| : Sends information about author.`;
        let embed = client.commands.get('embed').execute('nodesc', '** HELP **', mes);
        msg.channel.send({embeds: [embed]})
    }
}