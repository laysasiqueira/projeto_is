const inquirer = require('inquirer');

(async () => {
  const { nome } = await inquirer.prompt([
    {
      type: 'input',
      name: 'nome',
      message: 'Qual é o seu nome?',
    }
  ]);

  console.log(`Olá, ${nome}`);
})();
