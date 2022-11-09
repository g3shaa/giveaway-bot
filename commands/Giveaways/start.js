const ms = require('ms');
const config = require("../../config.json")

module.exports = {
    config: {
        name: "start",
        description: "Започване на раздаване.",
        usage: "[channel] [duration] [winners] [prize]",
        category: "Giveaways",
        accessableby: "Admins",
        aliases: [], 
    },
    run: async (client, message, args) => {
        if (config["Giveaway_Options"].giveawayManagerID) {
            if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.id === config["Giveaway_Options"].giveawayManagerID)) {
                return message.channel.send(':boom: Нямаш достатъчно привилегии в сървъра');
            }
        } else {
            if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
                return message.channel.send(':boom: Нямаш достатъчно привилегии в сървъра');
            }
        }

        let giveawayChannel = message.mentions.channels.first();
        if (!giveawayChannel) {
            return message.channel.send(':boom: Мамка му, не мога да открия този канал!');
        }

        let giveawayDuration = args[1];
        if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
            return message.channel.send(':boom: А ти зададе времетраене на това раздаване?');
        }

        let giveawayNumberWinners = args[2];
        if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) {
            return message.channel.send(':boom: Оф.. а колко победители? 0 ... няма как!');
        }

        let giveawayPrize = args.slice(3).join(' ');
        if (!giveawayPrize) {
            return message.channel.send(':boom: Уф.. това не е адекватна награда!');
        }
        if (!config["Giveaway_Options"].showMention && config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {

            giveawayChannel.send(`<@&${config["Giveaway_Options"].giveawayRoleID}>`).then((msg) => msg.delete({ timeout: 1000 }))
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: ":tada: **Раздаване** :tada:",
                    giveawayEnded: ":tada: **Раздаването е приключило** :tada:",
                    timeRemaining: "Оставащо време: **{duration}**!",
                    inviteToParticipate: "Реагирай с 🎉 , за да се запишеш!",
                    winMessage: "Поздравления, {winners}! Спечели **{prize}**!",
                    embedFooter: "Раздавания",
                    noWinner: "Няма достатъчно участници, за да се избере победител!",
                    hostedBy: "Създаден от: {user}",
                    winners: "победител(и)",
                    endedAt: "Приключил",
                    units: {
                        seconds: "секунди",
                        minutes: "минути",
                        hours: "часа",
                        days: "дни",
                        pluralS: false
                    }
                }
            });

        } else if (config["Giveaway_Options"].showMention && config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {

            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: (config["Giveaway_Options"].showMention ? `<@&${config["Giveaway_Options"].giveawayRoleID}>\n\n` : "") + ":tada: **Раздаване** :tada:",
                    giveawayEnded: (config["Giveaway_Options"].showMention ? `<@&${config["Giveaway_Options"].giveawayRoleID}>\n\n` : "") + ":tada: **Раздаването е приключило** :tada:",
                    timeRemaining: "Оставащо време: **{duration}**!",
                    inviteToParticipate: "Реагирай с 🎉, за да се запишеш!",
                    winMessage: "Поздравления, {winners}! Спечели **{prize}**!",
                    embedFooter: "Раздавания",
                    noWinner: "Няма достатъчно участници, за да се избере победител!",
                    hostedBy: "Създаден от: {user}",
                    winners: "победител(и)",
                    endedAt: "Приключил",
                    units: {
                        seconds: "секунди",
                        minutes: "минути",
                        hours: "часа",
                        days: "дни",
                        pluralS: false
                    }
                }
            });

        } else if (!config["Giveaway_Options"].showMention && !config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {
            giveawayChannel.send(`@everyone`).then((msg) => msg.delete({ timeout: 1000 }))
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: ":tada: **Раздаване** :tada:",
                   giveawayEnded: ":tada: **Раздаването е приключило** :tada:",
                    timeRemaining: "Оставащо време: **{duration}**!",
                    inviteToParticipate: "Реагирай с 🎉, за да се запишеш!",
                    winMessage: "Поздравления, {winners}! Спечели **{prize}**!",
                    embedFooter: "Раздавания",
                    noWinner: "Няма достатъчно участници, за да се избере победител!",
                    hostedBy: "Създаден от: {user}",
                    winners: "победител(и)",
                    endedAt: "Приключил",
                    units: {
                        seconds: "секунди",
                        minutes: "минути",
                        hours: "часа",
                        days: "дни",
                        pluralS: false
                    }
                }
            });

        } else if (config["Giveaway_Options"].showMention && !config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: (config["Giveaway_Options"].showMention ? `@everyone\n\n` : "") + ":tada: **GIVEAWAY** :tada:",
                    giveawayEnded: (config["Giveaway_Options"].showMention ? `@everyone\n\n` : "") + ":tada: **GIVEAWAY ENDED** :tada:",
                    timeRemaining: "Оставащо време: **{duration}**!",
                    inviteToParticipate: "Реагирай с 🎉, за да се запишеш!",
                    winMessage: "Поздравления, {winners}! Спечели **{prize}**!",
                    embedFooter: "Раздавания",
                    noWinner: "Няма достатъчно участници, за да се избере победител!",
                    hostedBy: "Създаден от: {user}",
                    winners: "победител(и)",
                    endedAt: "Приключил",
                    units: {
                        seconds: "секунди",
                        minutes: "минути",
                        hours: "часа",
                        days: "дни",
                        pluralS: false
                    }
                }
            });
        } else if (!config["Giveaway_Options"].giveawayMention) {
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: ":tada: **Раздаване** :tada:",
                   giveawayEnded: ":tada: **Раздаването е приключило** :tada:",
                    timeRemaining: "Оставащо време: **{duration}**!",
                    inviteToParticipate: "Реагирай с 🎉, за да се запишеш!",
                    winMessage: "Поздравления, {winners}! Спечели **{prize}**!",
                    embedFooter: "Раздавания",
                    noWinner: "Няма достатъчно участници, за да се избере победител!",
                    hostedBy: "Създаден от: {user}",
                    winners: "победител(и)",
                    endedAt: "Приключил",
                    units: {
                        seconds: "секунди",
                        minutes: "минути",
                        hours: "часа",
                        days: "дни",
                        pluralS: false
                    }
                }
            });
        }


        message.channel.send(`:tada: Готово! Раздаване за \`${giveawayPrize}\` е започнало в канала - ${giveawayChannel}!`);
    }
}
