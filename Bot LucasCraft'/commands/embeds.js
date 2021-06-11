const Discord = require('discord.js')

module.exports = {
    run: message => {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('**__Test Embed__**')
            .setDescription('Ceci est complètement inutile'))
    },
    name: 'embed'
}