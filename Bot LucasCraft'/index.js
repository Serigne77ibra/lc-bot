const Discord = require('discord.js'),
    client = new Discord.Client({
            fetchAllMembers: true
        }),
        config = require('./config.json')
        fs = require('fs')

client.login(config.token)
client.command = new Discord.Collection()

fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.command.set(command.name, command)
    })
})

client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return

    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.command.get(commandName.slice(config.prefix.length))
    if (!command) return
    command.run(message, args, client)
})

client.on('guildMemberAdd', member => {
    member.guild.channels.cache.get(config.greeting.channel).send(`🎉 ${member} viens de rejoindre le serveur, nous sommes désormais ${member.guild.memberCount} ! 🎉`)
    member.roles.add(config.greeting.role)
})

client.on('guildMemberRemove', member => {
    member.guild.channels.cache.get(config.greeting.channel).send(`😥 ${member.user.tag} viens de quitter le serveur, nous sommes désormais ${member.guild.memberCount}... 😥`)
})

client.on('ready', () => {
    client.user.setActivity('Bot Officiel de LUCASCRAFT', {type: 'PLAYING'})
})