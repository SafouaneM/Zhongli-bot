const Discord = require("discord.js")

const generateImage = require("../generateImage")

require("dotenv").config()

const client = new Discord.Client(
    {
        intents: [
            "GUILDS",
            "GUILD_MESSAGES",
            "GUILD_MEMBERS"
        ]
    }
)

let bot = {
    client,
    prefix: "g.",
    owners: [""]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require('./handlers/events')(bot,reload)
client.loadCommands = (bot, reload) => require('./handlers/commands')(bot,reload)

client.loadEvents(bot,false)
client.loadCommands(bot, false)

module.exports = bot

// client.once('ready', () => {
//     console.log(`Logged in as ${client.user.tag}`)
// })
//
// client.on("messageCreate.js", message => {
//     console.log(message.content)
//     if (message.content. startsWith("!help")) {
//         message.channel.send("HELP??")
//     }
// })
//
// const welcomeChannelId = "931963980111552512"
//
// client.on("guildMemberAdd", async member => {
//     const img = await generateImage(member)
//     member.guild.channels.cache.get(welcomeChannelId).send({
//         content: `<@${member.id}> Welcome to the server!`,
//         files: [img]
//     })
// })

client.login(process.env.TOKEN)