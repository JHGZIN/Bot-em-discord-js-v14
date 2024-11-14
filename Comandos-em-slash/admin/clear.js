const Discord = require("discord.js")

module.exports = {
  name: "clear", // Coloque o nome do comando
  description: "Limpar uma quantidade de mensagens.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options:[
      {
          name: "quantidade",
          description: "Número de mensagens para serem apagadas.",
          type: Discord.ApplicationCommandOptionType.Number,
          required: true,
      }
  ],
  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)){
        return interaction.reply({ content: "Você não possui permissão para utilizar este comando.", ephemeral: true })
    } else {
        let numero = interaction.options.getNumber('quantidade')

        if (parseInt(numero) > 99 || parseInt(numero) <= 0) {
            return interaction.reply({ content: `❌ | ${interaction.user}, você só pode limpar entre \`1\` a \`99\` mensagens!`, ephemeral: true })
        } else {
            interaction.channel.bulkDelete(parseInt(numero))

            interaction.reply({ content: `✅ | ${interaction.user}, o chat teve \`${numero}\` mensagens apagadas com sucesso!`, ephemeral: true })
        }
    }
      
  }
}