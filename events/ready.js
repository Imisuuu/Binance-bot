module.exports = {
    name: 'ready',
    description: 'chart command',
    execute (){
        console.log(`Logged to the client ${client.user.username}\n-> Ready on ${client.guilds.cache.size} servers for a total of ${client.users.cache.size} users`);
        client.user.setActivity(client.config.playing);
    }
}