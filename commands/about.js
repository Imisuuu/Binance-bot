module.exports = {
    name: 'about',
    description: 'chart command',
    async execute (msg) {
        await msg.channel.send(
            `>>>Author of this bot is **Imisuuu**
            Github: https://github.com/Imisuuu`);
    }
}