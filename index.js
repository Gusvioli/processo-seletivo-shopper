const { exec } = require('child_process');

// Comando a ser executado (exemplo: listar arquivos em um diretório)
const comando = `cd app && docker-compose up --build -d && cd backend && npm install && npm run dev`;

// Executa o comando
exec(comando, (erro, stdout, stderr) => {
  if (erro) {
    console.error(`Erro ao executar o comando: ${erro.message}`);
    return;
  }
  if (stderr) {
    console.error(`Erro padrão do comando: ${stderr}`);
    return;
  }
  console.log(`Saída do comando:\n${stdout}`);
});
