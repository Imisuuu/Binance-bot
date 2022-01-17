const fs = require('fs');

const commands = (Collection) => {
    client.commands = new Collection();

    readDir('/../commands/', 'commands');
    readDir('/../events', 'events');
    readDir('/../core', 'core');

    console.log('All commands loaded successfully!');
}

function readDir(dirname, req){
    const commandFiles = fs.readdirSync(__dirname + dirname).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
    const command = require(`../${req}/${file}`);

    client.commands.set(command.name, command);
    }
}

module.exports = commands;
