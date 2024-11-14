const fs = require("fs")

module.exports = async (client) => {

const SlashsArray = []

  fs.readdir(`./Comandos-em-slash`, (error, folder) => {
  folder.forEach(subfolder => {
fs.readdir(`./Comandos-em-slash/${subfolder}/`, (error, files) => { 
  files.forEach(files => {

  if(!files?.endsWith('.js')) return;
  files = require(`../Comandos-em-slash/${subfolder}/${files}`);
  if(!files?.name) return;
  client.slashCommands.set(files?.name, files);

  SlashsArray.push(files)
  });
    });
  });
});
  client.on("ready", async () => {
  client.application.commands.set(SlashsArray)
    });
};