module.exports = {
  name: "forceban",
  usage: "forceban [id]",
  aliases: ["fb"],
  description: "Ban anyone by id, you can ban him him if he is not in the server by his id",
  category: "moderation",
  run: (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ You do not have permissions to ban members. Please contact a staff member");
   }
    if (!args[0]) return message.channel.send( {embed: { "description": "Please type the id", "color": 0xff2050 } });
    let dead = args[0];
    message.guild.ban(dead).then(() => {
        message.channel.send({embed: { "description": `\`${args[0]}\` Has been force banned from the server`, color: 0xff2050 } })
    
    }).catch(err => {
        message.channel.send( { embed:{ "description": "The ID `"+message.args[0]+"` is not a valid user.", "color": 0xff2050 } });
    })
}
}
