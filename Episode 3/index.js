const discord = require('discord.js');
const client = new discord.Client();

client.on('ready', message => {
  console.log('I am ready');
});

client.on('message',message => {
          if(message.content === '+ping') {
            message.channel.send('Hi, You pinged me?')
          } else if(message.isMemberMentioned(client.user)) {
                    message.channel.send('How can i help you, btw my prefix is +')
                    }
});

client.on('message', message => {
  if(message.content === '+botinfo') {
    let embed = new discord.RichEmbed()
    .setTitle("BOT INFORMATION") //set title of embed
.setColor("#ff2052") //color of embed
    .setDescription("This bot is made by CTK WARRIOR, so nothing") //description of embed
    .addField("LIBRARY", "JavaScript")
    .setThumbnail(`${message.author.avatarURL}`)
    .setFooter(`Command req by ${message.author.username}`, `${message.author.avatarURL}`);
message.channel.send(embed);
  }
});

client.on("message", async message => {
  var prefix = ''
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if(command === "+kick") {
    if(!args[0]) {
      return message.channel.send("please provide a person to kick!");
    }
    
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ You do not have permissions to kick members. Please contact a staff member")
            
        }
    
    //no user permission
    if(!message.member.hasPermission("KICK_MEMBERS")) {
      return message.channel.send("You do not have enough permission to use the command");            
    }
    //no bot permissiomn

     //let the person to kick
    const tokick = message.mentions.members.first() || message.guild.members.get(args[0]);
    
    //if no member found
    if(!tokick) {
      return message.channel.send("cannot foundd the member, try again");
    }
    //cant kick yourself
    if(tokick.id === message.author.id) {
      return message.channel.send("You cant kick yourself");
    }
    //check the mentioned user is kickable
    if(!tokick.kickable) {
      return message.channel.send("i cant kick that person due to role issue");
    }
    //let the embed 
    const embed = new discord.RichEmbed()
    .setTitle("KICK MEMBER")
    .setColor("RANDOM")
    .setThumbnail(tokick.user.displayAvatarURL)
    .setDescription(`${message.member} kicked ${tokick}`)
    
    tokick.kick(args.slice(1).join(" "))
    .catch(err => {
      if (err) return message.channel.send(`Well kick doesnt worked. here is the eroor - ${err}`)
    });
    message.channel.send(embed);
  }
}

          )




client.login('TOKEN');
