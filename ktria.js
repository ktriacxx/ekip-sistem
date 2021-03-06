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

client.on("message", async msg => {
    if(msg.author.bot || !msg.guild || msg.channel.type == "dm" || !msg.content.toLocaleLowerCase().startsWith(Bot.Prefix)) return
    if(msg.member.roles.cache.get(Guild.CommandHammer) !== msg.member.roles.cache.get(Guild.CommandHammer) && !msg.member.hasPermission("ADMINISTRATOR") && !msg.member.hasPermission("MANAGE_GUILD") && msg.author.id !== msg.guild.ownerID) return
    let args = msg.content.split(' ').slice(1)
    let cmds = msg.content.split(' ')[0].slice(Bot.Prefix.length)
    let uye = msg.guild.member(msg.mentions.members.first()) || msg.guild.members.cache.get(args[0])

    if(cmds == "ekip" || cmds == "team" || cmds == "ekipbak") {
        let embed = new MessageEmbed().setFooter(Bot.Footer).setTimestamp().setColor("RANDOM").setAuthor(msg.guild.name, msg.guild.iconURL({ dynamic: true, size: 2048 })).setThumbnail(msg.guild.iconURL({ dynamic: true, size: 2048 }))
        let yesEmoji = msg.guild.emojis.cache.find(x => x.name == "ktriatik")
        let noEmoji = msg.guild.emojis.cache.find(x => x.name == "ktriared")
        let voice1 = parseInt(msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip1) && x.voice.channel).size / msg.guild.members.cache.filter(r => r.roles.cache.has(Ekip.Ekip1)).size * 100)
        let voice2 = parseInt(msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip2) && x.voice.channel).size / msg.guild.members.cache.filter(r => r.roles.cache.has(Ekip.Ekip2)).size * 100)
        let voice3 = parseInt(msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip3) && x.voice.channel).size / msg.guild.members.cache.filter(r => r.roles.cache.has(Ekip.Ekip3)).size * 100)
        let voice4 = parseInt(msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip4) && x.voice.channel).size / msg.guild.members.cache.filter(r => r.roles.cache.has(Ekip.Ekip4)).size * 100)

        let teamRoles = msg.mentions.roles.first() || msg.guild.roles.cache.find(role => role.name === args.join(' ')) || msg.guild.roles.cache.get(args[0])
        if(teamRoles) {
            let mentionRole = msg.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id)).size
            msg.channel.send(embed.setDescription(`${teamRoles} rol??ne sahip ekibin bilgilendirmesi:
\`???\` Toplam ??ye: \`${mentionRole} ki??i\`
\`???\` Tagl?? ??ye: \`${msg.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id) && x.user.username.includes(Guild.Tag)).size} ki??i\`
\`???\` ??evrimi??i ??ye: \`${msg.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id) && x.user.presence.status !== "offline").size} ki??i\`
\`???\` Sesteki ??ye: \`${msg.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id) && x.voice.channel).size} ki??i\`
\`???\` Seste Olmayan ??ye: \`${msg.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id) && !x.voice.channel && x.user.presence.status !== "offline").size} ki??i\`
\`???\` Seste Bulunma Oran??: \`%${parseInt(msg.guild.members.cache.filter(x => x.roles.cache.has(teamRoles.id) && x.voice.channel).size / msg.guild.members.cache.filter(r => r.roles.cache.has(teamRoles.id)).size * 100) || "0"}\`
`))
        } else {
            msg.channel.send(embed.setDescription(`A??a????daki ekip ??yelerini daha detayl?? bir ??ekilde g??rmek i??in a??a????daki komutu yaz??n??z.
\`${Bot.Prefix}ekip @ekiprol\`
???????????????????????????????????????????????????????????????
Toplam ??yeler: \`${msg.guild.members.cache.size} ki??i\`
Toplam Tagl??lar: \`${msg.guild.members.cache.filter(x => x.user.username.includes(Guild.Tag)).size} ki??i\`
??evrimi??i ??yeler: \`${msg.guild.members.cache.filter(x => x.user.presence.status !== "offline").size}\`
Sesteki ??yeler: \`${msg.guild.members.cache.filter(x => x.voice.channel).size} ki??i\`
Seste Olmayan ??yeler: \`${msg.guild.members.cache.filter(x => !x.voice.channel && x.user.presence.status !== "offline").size} ki??i\`
Seste Bulunma Oran??: \`%${parseInt(msg.guild.members.cache.filter(x => msg.guild.members.cache && x.voice.channel).size / msg.guild.members.cache.filter(r => r.guild.members.cache).size * 100) || "0"}\`
Ekiplerin Seste Bulunma Oran??: \`%${voice1+voice2+voice3+voice4 || "0"}\`
???????????????????????????????????????????????????????????????
<@&${Ekip.Ekip1}> **Ekip Bilgileri**
Toplam ??ye: \`${msg.guild.roles.cache.get(Ekip.Ekip1).members.size} ki??i\`
Tagl?? ??ye: \`${msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip1) && x.user.username.includes(Guild.Tag)).size} ki??i\`
??evrimi??i ??ye: \`${msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip1) && x.user.presence.status !== "offline").size} ki??i\`
Sesteki ??ye: \`${msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip1) && x.voice.channel).size} ki??i\`
Seste Olmayan ??ye: \`${msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip1) && !x.voice.channel && x.user.presence.status !== "offline").size} ki??i\`
Seste Bulunma Oran??: \`%${parseInt(msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip1) && x.voice.channel).size / msg.guild.members.cache.filter(r => r.roles.cache.has(Ekip.Ekip1)).size * 100) || "0"}\`
???????????????????????????????????????????????????????????????
<@&${Ekip.Ekip2}> **Ekip Bilgileri**
Toplam ??ye: \`${msg.guild.roles.cache.get(Ekip.Ekip2).members.size} ki??i\`
Tagl?? ??ye: \`${msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip2) && x.user.username.includes(Guild.Tag)).size} ki??i\`
??evrimi??i ??ye: \`${msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip2) && x.user.presence.status !== "offline").size} ki??i\`
Sesteki ??ye: \`${msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip2) && x.voice.channel).size} ki??i\`
Seste Olmayan ??ye: \`${msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip2) && !x.voice.channel && x.user.presence.status !== "offline").size} ki??i\`
Seste Bulunma Oran??: \`%${parseInt(msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip2) && x.voice.channel).size / msg.guild.members.cache.filter(r => r.roles.cache.has(Ekip.Ekip2)).size * 100) || "0"}\`
???????????????????????????????????????????????????????????????
<@&${Ekip.Ekip3}> **Ekip Bilgileri**
Toplam ??ye: \`${msg.guild.roles.cache.get(Ekip.Ekip3).members.size} ki??i\`
Tagl?? ??ye: \`${msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip3) && x.user.username.includes(Guild.Tag)).size} ki??i\`
??evrimi??i ??ye: \`${msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip3) && x.user.presence.status !== "offline").size} ki??i\`
Sesteki ??ye: \`${msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip3) && x.voice.channel).size} ki??i\`
Seste Olmayan ??ye: \`${msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip3) && !x.voice.channel && x.user.presence.status !== "offline").size} ki??i\`
Seste Bulunma Oran??: \`%${parseInt(msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip3) && x.voice.channel).size / msg.guild.members.cache.filter(r => r.roles.cache.has(Ekip.Ekip3)).size * 100) || "0"}\`
???????????????????????????????????????????????????????????????
<@&${Ekip.Ekip4}> **Ekip Bilgileri**
Toplam ??ye: \`${msg.guild.roles.cache.get(Ekip.Ekip4).members.size} ki??i\`
Tagl?? ??ye: \`${msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip4) && x.user.username.includes(Guild.Tag)).size} ki??i\`
??evrimi??i ??ye: \`${msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip4) && x.user.presence.status !== "offline").size} ki??i\`
Sesteki ??ye: \`${msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip4) && x.voice.channel).size} ki??i\`
Seste Olmayan ??ye: \`${msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip4) && !x.voice.channel && x.user.presence.status !== "offline").size} ki??i\`
Seste Bulunma Oran??: \`%${parseInt(msg.guild.members.cache.filter(x => x.roles.cache.has(Ekip.Ekip4) && x.voice.channel).size / msg.guild.members.cache.filter(r => r.roles.cache.has(Ekip.Ekip4)).size * 100) || "0"}\`
`))
        }
    }
    if(cmds == "ekipver" || cmds == "ekip-ver") {
        if(!uye) { msg.channel.send(`??ye belirt. \`${Bot.Prefix[0]}ekipver @Mavera/ID\``) } else {
            const bir = new buttons.MessageButton().setStyle("blurple").setLabel(Ekip.??sim.Ekip1).setID("bir")
            const iki = new buttons.MessageButton().setStyle("blurple").setLabel(Ekip.??sim.Ekip2).setID("iki")
            const uc = new buttons.MessageButton().setStyle("blurple").setLabel(Ekip.??sim.Ekip3).setID("uc")
            const dort = new buttons.MessageButton().setStyle("blurple").setLabel(Ekip.??sim.Ekip4).setID("dort")
            msg.channel.send(`\`${uye.user.tag}\` ??yesine vermek istedi??iniz ekip rol??n?? se??in.`, { buttons: [bir, iki, uc, dort] })
            
            client.on("clickButton", async button => {
                if(button.id == "bir") {
                    uye.roles.add(Ekip.Ekip1).then(() => { button.reply.send(`??yeye **${Ekip.??sim.Ekip1}** ekibinin rol??n?? verdim!`) })
                    .catch(() => { button.reply.send(`??yeye rol verilemedi! Baz?? sebepler; \`???\` Botun yetkisi bulunmuyor.\n\`???\` Botun kurulumu yap??lmam????.`) })
                }
                if(button.id == "iki") {
                    uye.roles.add(Ekip.Ekip2).then(() => { button.reply.send(`??yeye **${Ekip.??sim.Ekip2}** ekibinin rol??n?? verdim!`) })
                    .catch(() => { button.reply.send(`??yeye rol verilemedi! Baz?? sebepler; \`???\` Botun yetkisi bulunmuyor.\n\`???\` Botun kurulumu yap??lmam????.`) })
                }
                if(button.id == "uc") {
                    uye.roles.add(Ekip.Ekip3).then(() => { button.reply.send(`??yeye **${Ekip.??sim.Ekip3}** ekibinin rol??n?? verdim!`) })
                    .catch(() => { button.reply.send(`??yeye rol verilemedi! Baz?? sebepler; \`???\` Botun yetkisi bulunmuyor.\n\`???\` Botun kurulumu yap??lmam????.`) })
                }
                if(button.id == "dort") {
                    uye.roles.add(Ekip.Ekip4).then(() => { button.reply.send(`??yeye **${Ekip.??sim.Ekip4}** ekibinin rol??n?? verdim!`) })
                    .catch(() => { button.reply.send(`??yeye rol verilemedi! Baz?? sebepler; \`???\` Botun yetkisi bulunmuyor.\n\`???\` Botun kurulumu yap??lmam????.`) })
                }
            })
        }
    }
    if(cmds == "ekipal" || cmds == "ekip-al") {
        if(!uye) { msg.channel.send(`??ye belirt. \`${Bot.Prefix[0]}ekipal @Mavera/ID\``) } else {
            const bir = new buttons.MessageButton().setStyle("blurple").setLabel(Ekip.??sim.Ekip1).setID("abir")
            const iki = new buttons.MessageButton().setStyle("blurple").setLabel(Ekip.??sim.Ekip2).setID("aiki")
            const uc = new buttons.MessageButton().setStyle("blurple").setLabel(Ekip.??sim.Ekip3).setID("auc")
            const dort = new buttons.MessageButton().setStyle("blurple").setLabel(Ekip.??sim.Ekip4).setID("adort")
            msg.channel.send(`\`${uye.user.tag}\` ??yesinden almak istedi??iniz ekip rol??n?? se??in.`, { buttons: [bir, iki, uc, dort] })
            
            client.on("clickButton", async button => {
                if(button.id == "abir") {
                    uye.roles.remove(Ekip.Ekip1).then(() => { button.reply.send(`??yeden **${Ekip.??sim.Ekip1}** ekibinin rol??n?? ald??m!`) })
                    .catch(() => { button.reply.send(`??yeden rol al??namad??! Baz?? sebepler; \`???\` Botun yetkisi bulunmuyor.\n\`???\` Botun kurulumu yap??lmam????.\n\`???\` ??yede bu rol bulunmuyor.`) })
                }
                if(button.id == "aiki") {
                    uye.roles.remove(Ekip.Ekip2).then(() => { button.reply.send(`??yeden **${Ekip.??sim.Ekip2}** ekibinin rol??n?? ald??m!`) })
                    .catch(() => { button.reply.send(`??yeden rol al??namad??! Baz?? sebepler; \`???\` Botun yetkisi bulunmuyor.\n\`???\` Botun kurulumu yap??lmam????.\n\`???\` ??yede bu rol bulunmuyor.`) })
                }
                if(button.id == "auc") {
                    uye.roles.remove(Ekip.Ekip3).then(() => { button.reply.send(`??yeden **${Ekip.??sim.Ekip3}** ekibinin rol??n?? ald??m!`) })
                    .catch(() => { button.reply.send(`??yeden rol al??namad??! Baz?? sebepler; \`???\` Botun yetkisi bulunmuyor.\n\`???\` Botun kurulumu yap??lmam????.\n\`???\` ??yede bu rol bulunmuyor.`) })
                }
                if(button.id == "adort") {
                    uye.roles.remove(Ekip.Ekip4).then(() => { button.reply.send(`??yeden **${Ekip.??sim.Ekip4}** ekibinin rol??n?? ald??m!`) })
                    .catch(() => { button.reply.send(`??yeden rol al??namad??! Baz?? sebepler; \`???\` Botun yetkisi bulunmuyor.\n\`???\` Botun kurulumu yap??lmam????.\n\`???\` ??yede bu rol bulunmuyor.`) })
                }
            })
        }
    }
    if(cmds == "ekipsay" || cmds == "ekip-say") {
        let rol = msg.mentions.roles.first() || msg.guild.roles.cache.find(mavera => mavera.name == args.join(" ")) || msg.guild.roles.cache.get(args[0])
        if(!rol) { msg.channel.send(`Bir ekip rol?? belirt. \`${Bot.Prefix[0]}ekipsay @rol\``) } else {
            let ekipUye = msg.guild.members.cache.filter(x => x.roles.cache.has(rol.id) && x.user.presence.status !== "offline")
            let tumUye = msg.guild.members.cache.filter(x => x.roles.cache.has(rol.id)).size
            msg.channel.send(`Seste olmayan ve aktif olan **${ekipUye.size}** ??ye bulunuyor. (Toplamda **${tumUye}** ??ye bu ekipte.)
???????????????????????????????????????????????????????????????
${ekipUye.map(mavera => `${mavera}`).join(", ")}`)
        }
    }
    if(cmds == "eval") {
        if(!args[0]) return msg.react("???")
        let code = args.join(" ")
        function clean(text) {
            if(typeof text != "string") text = require("util").inspect(text, {
                depth: 0
            })
            text = text.replace(/`/g, '`' + String.fromCharCode(8203).replace(/@/g, '@' + String.fromCharCode(8203)))
            return text
        } 
        try {
            var evaled = clean(await eval(code))
            if(evaled.match(new RegExp(`${client.token}`, "g"))) evaled.replace(client.token, "yasakl??")
            msg.channel.send(`${evaled.replace(client.token, "yasak")}`, {
                code: "js",
                split: true
            })
        } catch(err) {
            msg.channel.send(err, {
                code: "js",
                split: true
            })
        }
    }
})
