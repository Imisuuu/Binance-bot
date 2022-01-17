module.exports = {
    name: 'getCoin',
    description: 'Get coin from arguments command',
    execute (args, CMD_NAME, message){
        let coin = undefined;

        if(CMD_NAME === 'help' || CMD_NAME === 'about' || CMD_NAME === 'bal' || CMD_NAME === 'balance'){}  
        else if (args[0] != undefined) {
            if(args[0].includes('/')){
                const word = args[0].split('/');
                coin = `${word[0]}${word[1]}`;
            }else {
                coin = args[0];
            }
            return coin.toLowerCase();
        } else {
            return message.reply('You need to put arguments, check $help function.');
        }
    }
}