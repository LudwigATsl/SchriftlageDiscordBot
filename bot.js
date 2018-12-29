//Settings!
const yourID = "527639184941383680"; //Instructions on how to get this: https://redd.it/40zgse
const setupCMD = "!rolle"
let initialMessage = `**Akzeptieren der Regeln**`;
const roles = ["Mitglied"];
const reactions = ["✅"];
const Discord = require('discord.js');

//Load up the bot...

const bot = new Discord.Client();
bot.login(process.env.token);

bot.on('ready', function() {
    console.log('Schriftlage-Bot wurde erfolgreich gestartet.');
});


//If there isn't a reaction for every role, scold the user!
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

//Function to generate the role messages, based on your settings
function generateMessages(){
    var messages = [];
    messages.push(initialMessage);
    for (let role of roles) messages.push(`Durch das Reagieren mit :white_check_mark:  auf diese Nachricht, akzeptierst du die Serverregeln, wirst freigeschaltet und erhältst die Rolle **"${role}"**!`); //DONT CHANGE THIS
    return messages;
}


bot.on("message", message => {
    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD){
        var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                  sent.react(mapObj[1]);  
                } 
            });
        }
    }
})


bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
        
        let channel = bot.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);
        
        if (msg.author.id == bot.user.id && msg.content != initialMessage){
       
            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
            var role = msg.content.match(re)[1];
        
            if (user.id != bot.user.id){
                var roleObj = msg.guild.roles.find(r => r.name === role);
                var memberObj = msg.guild.members.get(user.id);
                
                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj)
                } else {
                    memberObj.removeRole(roleObj);
                }
            }
        }
        })
 
    }   
});

    bot.on('guildMemberAdd', member => {
        member.send("Herzlich Wilkommen auf dem **Schriftlage Community Server** !\n\nBitte halte dich an die vorgeführten Chatregeln, du findest sie unter `#regeln`.\nInformationen über uns und den Server erfährst du im Kanal  `#info`.\nBleib auf dem laufenden und schau ab und zu mal hier rein: `#ankündigungenen-und-updates`.\n\nSchalte dich auf dem Server frei, indem du die in `#regeln` aufgeführten Regeln akzeptierst.\n\nWir hoffen du genießt deinen Aufenhalt!");

        var social = new Discord.RichEmbed()
        .setThumbnail(bot.user.avatarURL)
        .setColor("#7289da")
        .addField("**Schau doch auch mal in unsere sozialen Netzwerke herein**", "__**Unsere Sozialen Netzwerke**__\n[Instagram](https://www.instagram.com/schriftlage) - Auf Instagram siehst du Ausschnitte unserer Arbeiten und diverse andere Bilder unseres Altages und deren Fortschritt. \n[Twitter](https://twitter.com/schriftlage) - Auf Twitter Informieren wir euch in Echtzeit über die neuen Dinge und können eure Fragen beantworten.\n[Facebook](https://www.facebook.com/Schriftlage) - Auf Facebook könnt ihr euch ein detaillierteres Bild unserer Arbeit machen.\n[YouTube](https://www.youtube.com/channel/UC_nrpoFCkPvWIle60Kz41IA) - Auf unseren YouTube Kanal kannst du dir ganz bequem die besten unserer Projekte anschauen. \n[Soundcloud](https://soundcloud.com/Schriftlage) - Unsere Soundcloud\n[Dribble](https://dribbble.com/Schriftlage) - Unser Dribble Account", true)
        member.send(social);
});
    


bot.on('ready', () => {
    bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: 'Schreib mir #Hallo !',
            type: "STREAMING",
            url: "https://www.schriftlage.de"
        }
    });
});






// Private Interaktionen

bot.on("message", message => {
    if(message.author.bot)
        console.log("[Schrtiftlage_Client] Bot responding...")
    
    else
        console.log("["+message.mentions._client.readyAt+":"+" "+message.author.username +"]" +":"+ " " + message.content);
    
    var prefix = '#';

if(message.content.toLowerCase == prefix + "hallo" {
    var HalloInfo = new Discord.RichEmbed()
        .setColor("#7289da")
        .setThumbnail(bot.user.avatarURL)
        .addField("Befehle", "das kann ich für dich tun", true)
        .addField("#schriftlage", "Erfahre mehr über uns, wer wir sind und was wir machen.", true)
        .addField("#social", "Unsere sozialen [Netzwerke](https://www.schriftlage.de) und wo wir noch so im Internet zu finden sind.", true)
        message.author.send("Hallo ich bin Schriftie, der Schriftlage Discord Bot. Was kann ich für dich tun ?");
        message.author.send(HalloInfo);
};
    
if(message.content.startsWith(prefix + "social")|| message.content.startsWith(prefix + "Social")){
    var social = new Discord.RichEmbed()
        .setColor("#7289da")
        .setThumbnail(bot.user.avatarURL)
        .addField("Social", "**Unsere Sozialen Netzwerke**\n[Instagram](https://www.instagram.com/schriftlage) - Unser Instagram Account\n[Twitter](https://twitter.com/schriftlage) - Unser Twitter Account\n[Facebook](https://www.facebook.com/Schriftlage) - Unsere Facebook Seite\n[YouTube](https://www.youtube.com/channel/UC_nrpoFCkPvWIle60Kz41IA) - Unser YouTube Kanal\n[Soundcloud](https://soundcloud.com/Schriftlage) - Unsere Soundcloud\n[Dribble](https://dribbble.com/Schriftlage) - Unser Dribble Account", true)
        message.author.send(social);
    
    
    
    
}; 


});
