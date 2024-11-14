const Discord = require("discord.js")
const client = require("../index")

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "ticket") {
      let formulário = new Discord.ModalBuilder()
        .setCustomId("modal")
        .setTitle("Sistema de ticket.")

      let pergunta1 = new Discord.TextInputBuilder()
        .setCustomId("pergunta1")
        .setPlaceholder("Qual o motivo do ticket?")
        .setLabel("Motivo do ticket. EX: Denuncia, suporte, comprar etc.")
        .setStyle(Discord.TextInputStyle.Short)
        .setRequired(true)
      
    }
  }
})