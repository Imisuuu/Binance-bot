const getCoin = (args, CMD_NAME) => {
    let coin = undefined;

    if(CMD_NAME === 'help' || CMD_NAME === 'about'){}  
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
};

module.exports = getCoin;