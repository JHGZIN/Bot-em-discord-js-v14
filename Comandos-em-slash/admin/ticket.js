const Discord = require("discord.js")

module.exports = {
  name: "ticket", // Coloque o nome do comando
  description: "Mandar o menu do ticket.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)){
        return interaction.reply({ content: "Você não possui permissão para utilizar este comando.", ephemeral: true })
    } else {
        let embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setTitle("Título indefinido")
        .setDescription("Descrição indefinida.")

        let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("ticket")
            .setEmoji("🎫")
            .setLabel("Abrir ticket")
            .setStyle(Discord.ButtonStyle.Secondary)
        )

        interaction.channel.send({ embeds: [embed], components: [botao] })
    
    }
  }
}