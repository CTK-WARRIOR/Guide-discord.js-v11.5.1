const { RichEmbed } = require("discord.js");

module.exports = {
    name: "suggest",
  category: "main",
  usage: "<message>",
    description: "suggest anything you wanted to",
    run: async (bot, message, args) => {
    message.delete()
    // reasoning definition
    let suggestion = args.join(" ");
    if (!suggestion)
      return message.channel
        .send(`Please provide a suggestion!`)
        .then(m => m.delete(15000));

    // grab reports channel
    let sChannel = message.guild.channels.find(x => x.name === "suggestions");
      if(!sChannel) return message.channel.send("You dident have channel with name `suggestions`")
    // send to reports channel and add tick or cross
    message.channel 
      .send("Your suggestion has been filled to the staff team. Thank you!")
      .then(m => m.delete(15000));
    let suggestembed = new RichEmbed()
      .setFooter(bot.user.username, bot.user.displayAvatarURL)
      .setTimestamp()
      .addField(`New Suggestion from:`, `**${message.author.tag}**`)
      .addField(`Suggestion:`, `${suggestion}\n**Its your choice!**`)
      .setColor('#ff2052');
    sChannel.send(suggestembed).then(async msg => {
      await msg.react("✅");
      await msg.react("❌");
    });
  }
};
 
