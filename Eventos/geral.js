const client = require("../index")

const statuses = ['Nome indefinido.', 'Desenvolvido por: JHGZIN'];
let index = 0;

client.on('ready', async () => {
  console.log(`🔥 Estou online em ${client.user.username}!`)
  setInterval(() => {
      client.user.setActivity(statuses[index]);
      index = (index + 1) % statuses.length;
    }, 10000);  
})