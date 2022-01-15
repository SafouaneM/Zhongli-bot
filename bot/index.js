const Discord = require("discord.js")

require("dotenv").config()

const client = new Discord.Client(
    {
        intents: [
            "GUILDS",
            "GUILD_MESSAGES"
        ]
    }
)

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", message => {
    console.log(message.content)
    if (message.content.startsWith("!help")){
    message.channel.send("HELP??")
    }
})

client.login(process.env.TOKEN)