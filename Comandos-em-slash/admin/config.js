const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB();

module.exports = {
  name: "config", // Coloque o nome do comando
  description: "Menu de configuração do bot.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)){
        return interaction.reply({ content: "Você não possui permissão para utilizar este comando.", ephemeral: true })
    } else {
        let embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setTitle("Menu de configuração")
        .setDescription("Click em um dos botões abaixo para começar a configuração.")

        let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("configticket")
            .setLabel("Config ticket")
            .setStyle(Discord.ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("botgeral")
            .setLabel("Config bot geral")
            .setStyle(Discord.ButtonStyle.Secondary),
        )

        let msg = await interaction.reply({ embeds: [embed], components: [botao] })

        let coletor = msg.createMessageComponentCollector()
        coletor.on("collect", async (interaction) => {

            if (interaction.user.id !== interaction.user.id){
                return;
            }
            
            if (interaction.customId === "configticket") {
                let embed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setTitle("Configuração do ticket")
                .setDescription("Click em um dos botões abaixo para começar a configuração.")

                let botao = new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                    .setCustomId("ticketmsg")
                    .setLabel("Mensagem do ticket")
                    .setStyle(Discord.ButtonStyle.Secondary),
                    new Discord.ButtonBuilder()
                    .setCustomId("ticketcategoriaticket")
                    .setLabel("Categoria do ticket")
                    .setStyle(Discord.ButtonStyle.Secondary),
                    new Discord.ButtonBuilder()
                    .setCustomId("ticketmsgdelete")
                    .setLabel("Mensagem de exclusão")
                    .setStyle(Discord.ButtonStyle.Secondary),
                )
                interaction.update({ embeds: [embed], components: [botao] })
            }
            if (interaction.customId === "botgeral") {
                let embed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setTitle("Configuração do bot geral")
                .setDescription("Click em um dos botões abaixo para começar a configuração.")

                let botao = new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                    .setCustomId("botgeralstatus")
                    .setLabel("Status do bot geral")
                    .setStyle(Discord.ButtonStyle.Secondary)
                )
                interaction.update({ embeds: [embed], components: [botao] })
            }

            if (interaction.customId === "ticketmsg"){
                let embed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setTitle("Configuração do ticket")
                .setDescription("Digite a mensagem do ticket abaixo.") 
            
            }

            
        })
    }
  }
}