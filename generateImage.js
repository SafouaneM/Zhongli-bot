const Canvas = require('canvas')

const Discord = require('discord.js')

const bgUrl = "https://i.imgur.com/wtpIWz0.jpg"


const dim = {
    height: 720,
    width: 1280,
    margin: 50
}

const av = {
    size: 256,
    x: 540,
    y: 150

}

const generateImage = async (member) => {
    let username = member.user.username
    let discrim = `#${member.user.discriminator} `
    let avatarUrl = member.user.displayAvatarURL({format: "png", dynamic: false, size: av.size})


    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    //draw in the bg
    const backImg = await Canvas.loadImage(bgUrl)
    ctx.drawImage(backImg, 0, 0)

    //apparently renders black box
    ctx.fillStyle = "rgba(0,0,0,0.8)"
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin)

    const avImg  = await Canvas.loadImage(avatarUrl)
    ctx.save()

    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0,Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avImg, av.x, av.y)
    ctx.restore()

    //render text
    ctx.fillStyle = "white"
    ctx.textAlign = "center"

    //render wlcome txt
    ctx.font = "50px Roboto"
    ctx.fillText("Welcome", dim.width/2, dim.margin + 70)

    ctx.font = "60 px Roboto"
    ctx.fillText(username  + discrim, dim.width/2, dim.height - dim.margin - 125)

    //render to server
    ctx.font = "40px Roboto"
    ctx.fillText("to the server", dim.width / 2, dim.height - dim.margin - 50)
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    return attachment
}

module.exports = generateImage