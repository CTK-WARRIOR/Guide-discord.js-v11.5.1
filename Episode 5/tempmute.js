const ms = require("ms");
 
module.exports = {
    
        name: "tempmute",
        description: "Mute anyone for a perticular time",
        usage: "!tempmute <user> <time> <reason>",
        category: "moderation",
    run: async (client, message, args) => {
// check if the command caller has permission to use the command
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");
 
if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to add roles!")
     
//define the reason and mutee
let time = args[1];
let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!mutee) {
        return message.channel.send("Please mention the user that you want to mute")
        .then(m => m.delete(10000));
      }
      if (mutee.id === message.author.id) {
            return message.reply("You can't mute yourself...")
                .then(m => m.delete(10000));
        }
      
  
 
let reason = args.slice(2).join(" ");
if(!reason) reason = "No reason given"
 
//define mute role and if the mute role doesnt exist then create one
let muterole = message.guild.roles.find(r => r.name === "muted")
if(!muterole) {
    try{
        muterole = await message.guild.createRole({
            name: "muted",
            color: "#514f48",
            permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                SPEAK: false
            })
        })
    } catch(e) {
        console.log(e.stack);
    }
}
 
//add role to the mentioned user and also send the user a dm explaing where and why they were muted
mutee.addRole(muterole.id).then(() => {
    message.delete()
    mutee.send(`Hello, you have been muted in \`${message.guild.name}\`\nReason: \`${reason}\`\nTime: \`${ms(ms(time))}\``).catch(err => console.log(err))
   
})
setTimeout(function(){
  mutee.removeRole(muterole.id)
  mutee.send(`You have been unmuted from \`${message.guild.name}\``)



}, ms(time))
//send an embed to the modlogs channel
 

message.channel.send(`${mutee.user.tag} has been muted for ${ms(ms(time))}`)
    }
}
