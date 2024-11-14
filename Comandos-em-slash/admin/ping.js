const Discord = require("discord.js")

module.exports = {
  name: "ping", // Coloque o nome do comando
  description: "Veja o meu ping.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)){
        return interaction.reply({ content: "Você não possui permissão para utilizar este comando.", ephemeral: true })
    }
    let ping = client.ws.ping;

    let embed_1 = new Discord.EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`Olá ${interaction.user}, meu ping está em \`calculando...\`.`)
    .setColor("Random");

    let embed_2 = new Discord.EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`Olá ${interaction.user}, meu ping está em \`${ping}ms\`.`)
    .setColor("Random");

    interaction.reply({ embeds: [embed_1]}).then( () => {
        setTimeout( () => {
            interaction.editReply({ embeds: [embed_2] })
        }, 2000)
    })
  }
}