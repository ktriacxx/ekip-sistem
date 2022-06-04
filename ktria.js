const { Client, MessageAttachment, MessageCollector, MessageEmbed } = require("discord.js")
const client = new Client()
const { Bot, Guild, Ekip } = require("./maveraktria.json") 
const buttons = require("discord-buttons")
buttons(client)

client.login(Bot.Token)
client.on("ready", () => {
    client.user.setActivity({ name: Bot.Ready })
    console.log(client.user.tag)
})
