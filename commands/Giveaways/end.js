module.exports = {
    config: {
        name: "end",
        description: "Приключване на раздаването.",
        usage: "[message-id]",
        category: "Giveaways",
        accessableby: "Admins",
        aliases: [], // To add custom aliases just type ["alias1", "alias2"].
    },
    run: async (client, message, args) => {

        if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return message.channel.send(':boom: Нямаш достатъчно привилегии в сървъра!');
        }

        if (!args[0]) {
            return message.channel.send(':boom: Ми можеше да ми кажеш в кой канал да го направя! ;-;');
        }

        let giveaway =
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if (!giveaway) {
            return message.channel.send(':boom: Не мога да намеря раздаването `' + args.join(' ') + '`.');
        }
        client.giveawaysManager.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        })
            .then(() => {
                message.channel.send('Раздаването ще приключи след ' + (client.giveawaysManager.options.updateCountdownEvery / 1000) + ' секунди...');
            })
            .catch((e) => {
                if (e.startsWith(`Раздаването с ID ${giveaway.messageID} приключи.`)) {

                    message.channel.send('Това раздаване вече е свършило!');

                } else {
                    console.error(e);
                    message.channel.send('Грешка...');
                }
            });
    },
}
