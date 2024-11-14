const Discord = require("discord.js")
const fs = require('fs');
const dotenv = require("dotenv")
const path = require("path");

dotenv.config()

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.GuildPresences,
    Discord.GatewayIntentBits.GuildMessageTyping,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.DirectMessageReactions,
    Discord.GatewayIntentBits.DirectMessageTyping,
    Discord.GatewayIntentBits.GuildEmojisAndStickers,
    Discord.GatewayIntentBits.GuildIntegrations,
    Discord.GatewayIntentBits.GuildWebhooks,
    Discord.GatewayIntentBits.GuildInvites,
    Discord.GatewayIntentBits.GuildScheduledEvents   
  ],
  partials: [
    Discord.Partials.Channel,
    Discord.Partials.GuildMember,
    Discord.Partials.GuildScheduledEvent,
    Discord.Partials.Message,
    Discord.Partials.Reaction,
    Discord.Partials.ThreadMember,
    Discord.Partials.User
  ],
})

//Funções dos comandos em prefixos
client.commands = new Discord.Collection();
const prefixos = [".", "!"];
const cooldowns = new Map();

// Função para carregar os comandos de um diretório
const loadCommands = (dir) => {
  const commandFiles = fs
    .readdirSync(path.join(__dirname, dir))
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(path.join(__dirname, dir, file));
    client.commands.set(command.name, command);
  }

  // Carregar recursivamente comandos de subdiretórios
  const subdirs = fs
    .readdirSync(path.join(__dirname, dir))
    .filter((subdir) =>
      fs.lstatSync(path.join(__dirname, dir, subdir)).isDirectory(),
    );
  for (const subdir of subdirs) {
    loadCommands(path.join(dir, subdir));
  }
};

// Carregar todos os comandos

loadCommands("Comandos");

client.on("messageCreate", async (message) => {
  if (message.author.bot) return; // Ignorar mensagens de bots

  // Verifique se a mensagem começa com algum dos prefixos
  const prefix = prefixos.find((p) => message.content.startsWith(p));
  if (!prefix) return; // Se a mensagem não começar com um dos prefixos, ignore

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return; // Verifique se o comando existe

  // Sistema de anti-flood
  const cooldownAmount = 3 * 1000; // 3 segundos de tempo de espera
  if (!cooldowns.has(message.author.id)) {
    cooldowns.set(message.author.id, Date.now() + cooldownAmount);
  } else {
    const expirationTime = cooldowns.get(message.author.id);
    if (Date.now() < expirationTime) {
      const timeLeft = (expirationTime - Date.now()) / 1000;
      return message
        .reply(
          `Por favor, espere ${timeLeft.toFixed(1)} segundos antes de usar outro comando.`,
        )
        .then((msg) => {
          setTimeout(() => msg.delete(), 5000);
        });
    }
    cooldowns.set(message.author.id, Date.now() + cooldownAmount);
  }

  try {
    const command = client.commands.get(commandName);
    await command.execute(message, args, client); // Execute o comando
  } catch (error) {
    console.error(error);
    message.reply("Houve um erro ao tentar executar esse comando!").then((msg) => {
      setTimeout(() => msg.delete(), 5000)
    });
  }
});

// Slash Comands
module.exports = client

client.slashCommands = new Discord.Collection()

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    const { commandName } = interaction;
    const cmd = client.slashCommands.get(commandName);

    if (!cmd) return interaction.reply("Comando não encontrado.");

    try {
      cmd.run(client, interaction);
    } catch (error) {
      console.error(error);
      interaction.reply("Ocorreu um erro ao executar o comando. Por favor, contate um administrador para assistência.");
    }
  }
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});

require('./Handler')(client)

fs.readdir('./Eventos', (err, file) => {
  file.forEach(event => {
    require(`./Eventos/${event}`)
  })
})

const Token = process.env.TOKEN
client.login(Token) 