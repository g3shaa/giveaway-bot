const ms = require('ms');
const config = require("../../config.json")
module.exports = {
    config: {
        name: "reroll",
        description: "Реролване на раздаването.",
        usage: "[message-id]",
        category: "Giveaways",
        accessableby: "Admins",
        aliases: [], // To add custom aliases just type ["alias1", "alias2"].
    },
    run: async (client, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return message.channel.send(':boom: Нямаш достатъчно привилегии в сървъра.');
        }

        if (!args[0]) {
            return message.channel.send(':boom: Не мога да намеря това съобщение.');
        }

        let giveaway =
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if (!giveaway) {
            return message.channel.send(':boom: Не мога да намеря раздаването `' + args.join(' ') + '`.');
        }

        client.giveawaysManager.reroll(giveaway.messageID)
            .then(() => {
                message.channel.send('Избра се нов победител!');
            })
            .catch((e) => {
                if (e.startsWith(`Раздаването с ID ${giveaway.messageID} не е приключило.`)) {
                    message.channel.send('Това раздаване не е приключило!');
                } else {
                    console.error(e);
                    message.channel.send('Грешка...');
                }
            });
    },
}

