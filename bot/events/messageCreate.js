const Discord = require('discord.js')

module.exports = {
    name: "messageCreate",
    run: async function runAll(bot, message) {
        const {client, prefix,owners} = bot
        if (!message.guild) return

        if (message.author.bot) return

        if (!message.content.startsWith(prefix))
            return

        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const cmdstr = args.shift().toLowerCase()

        let command = client.commands.get(cmdstr)
        if(!command) return

        let member = message.member

        if (command.devOnly && !owners.includes(member.id)) {
            return message.reply("This cmd is onyl for wowners fam")
        }

        if (command.permissions && member.permissions.missing(command.permissions).length !== 0) {
            return message.reply("permssion for you is not going to ber granted anytime soon")
        }

        try {
            await command.run({...bot, message, args})
        }
        catch (e){
           let error = e.toString()

            if (error.startsWith("?")) {
                error = error.slice(1)
                await message.reply(error)
            }
        else
            console.error(e)
        }

    } //n.ping hello

}