const {getFiles} = require('../util/functions')
const fs = require('fs')

module.exports = (bot,reload) => {
    const {client} = bot

    fs.readdirSync('bot/commands/').forEach((category) => {
        let commands = getFiles(`bot/commands/${category}`, ".js")

        commands.forEach((f) =>{
            if(reload)
                delete require.cache[require.resolve(`../commands/${category}/${f}`)]
            const command = require(`../commands/${category}/${f}`)
            client.commands.set(command.name, command)
        })
    })
    console.log(`loaded ${client.commands.size} commands`)
}