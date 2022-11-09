const { MessageEmbed } = require("discord.js");
const config = require("../../config.json")
module.exports = {
  config: {
    name: "help",
    description: "Списък с бот командите.",
    usage: "help",
    category: "Main",
    accessableby: "Everyone",
    aliases: [], 
  },
  run: async (client, message, args) => {
    let avatarOptions = {
      format: 'png',
      dynamic: true,
      size: 1024
    }

    const embed = new MessageEmbed()
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ ...avatarOptions }),
        'https://github.com/g3shaa/giveaway-bot'
      )
      .setThumbnail(client.user.displayAvatarURL({ ...avatarOptions }))
      .setTitle('Помощ с команди')
      .setURL('https://github.com/g3shaa/giveaway-bot')
      .setColor('7289da')
      .addFields({
        name: `🎉 ${config["Bot_Info"].prefix}start [канал] [време] [победители] [награда]`,
        value: [
          'Този канал трябва да бъде видим за Elite Giveaway Bot.',
          'Времетраенето трябва да бъде представена като цяло число или като време.',
          'Броят на възможните победители трябва да бъде позитивно цяло число.',
          'Наградата може да бъде всичко, което си поискаш. UwU'
        ].join('\n')
      }, {
        name: '👥 Пример:',
        value: [
          `⌨️ ${config["Bot_Info"].prefix}start #general 10m 1 $9.99 Nitro`,
          `➡️ Създаден за \`10 минути\` с \`1\` победител и`,
          `\`$9.99 Nitro\` като награда в канал \`#general\`.`
        ].join('\n')
      }, {
        name: `❌ ${config["Bot_Info"].prefix}end [message-id]`,
        value: 'Message-ID трябва да бъде **ID** на giveaway embed съобщението.\n**А не линк!**'
      },  {
        name: `🔍 ${config["Bot_Info"].prefix}reroll [message-id]`,
        value: 'Message-ID трябва да бъде **ID** на giveaway embed съобщението.\n**А не линк!**'
      })
      .setFooter('Направено от Гешата', client.user.displayAvatarURL({ ...avatarOptions }))

    if (message.guild) {
      message.channel.send('Провери си личното съобщение с бота!');
      message.delete();
      message.author.send(embed);
    } else {
      message.author.send(embed)
    }
  },
};
