module.exports = {
    name: 'about',
    description: 'About command.',
    async execute (msg) {
        await msg.channel.send(
`>>> Author of this bot is **Imisuuu**
Github: https://github.com/Imisuuu`);
    }
}