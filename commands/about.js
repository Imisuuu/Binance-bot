module.exports = {
    name: 'about',
    description: 'Sends information about author.',
    execute (msg) {
        let mes = 
`Author of this bot is **Imisuuu**
Github: https://github.com/Imisuuu`;
        let embed = client.commands.get('embed').execute("nodesc", "***About***" ,mes)
        msg.channel.send({embeds: [embed]})
    }
}