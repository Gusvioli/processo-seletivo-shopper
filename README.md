# Desenvolvimento da Ferramenta de Atualização de Preços

## Introdução

Olá, Shopper(a)! Agradeço pela oportunidade. Neste readme, delinearei as etapas para a execução da ferramenta de atualização de preços.

## Estrutura do Sistema

A estrutura do sistema será a seguinte:

- Back-end em Node.js, Express, JOI, Mysql2 e dotenv para aplicar as regras e lógica de negócio e utilização do sistema.
- Front-end em React.js(Vite.js) e Axios para a interface do usuário interagir com a ferramenta e funcionamento do sistema com ligação ao Back-end.
- Linguagem preferencial: TypeScript.
- Banco de dados MySQL (versão 8.0) para armazenar informações sobre produtos, pacotes e preços, utilize o docker para subir o conteiner do Mysql(O Back-end é responsavel por criar a database, tabelas e popular o banco de dados).

### Variáveis de ambientes

Variável  | Valor
--------- | ------
DB_USER   | root
DB_PASS   | 123456
DB_HOST   | localhost
DB_NAME   | shopper
DB_PORT   | 3002

## Funcionalidades

Vou detalhar as Funcionalidades da Ferramenta:

1. Upload do arquivo CSV de precificação.
2. Botão "VALIDAR" para verificar a integridade dos dados.
3. Exibição das informações dos produtos validados: Código, Nome, Preço Atual, Novo Preço.
4. Identificação das regras quebradas, se houver, ao lado de cada produto.
5. Botão "ATUALIZAR" habilitado apenas se todos os produtos estiverem validados e sem regras quebradas.
6. Ao clicar em "ATUALIZAR", os novos preços são salvos no banco de dados e a ferramenta está pronta para um novo arquivo.
7. Atualização automática dos preços de custo dos pacotes conforme a soma dos custos dos componentes.

## Instalação e execução do sistema

**Obs: Antes de instalar e executar o sistema, verifique se as portas 3000, 3001 e 3002 estão desocupadas.**</br>
Sujestão: ``lsof -i :3000,3001,3002`` ``killall node ou o PID``

- 1° Faça o clone do projeto ``git clone git@github.com:Gusvioli/processo-seletivo-shopper.git``;
- 2° Renomeie o arquivo ``processo-seletivo-shopper/app/backend/.env-exemplo`` para ``.env``;
- 3° Abra o terminal de comando dentro do diretório *PROCESSO-SELETIVO-SHOPPER* rode o comando abaixo;

<details>
<summary>Imagem: Deretório - PROCESSO-SELETIVO-SHOPPER</summary>

![Abertura pelo terminal integrado](print-screens/Captura%20de%20tela%20de%202024-04-20%2014-43-41.png)

</details>

### Execução e instalação das dependências do Front-end(node_modules e Banco de dados)</br>  

``npm run start``

Utilize o link: <http://127.0.0.1:3001> para acessar o Back-end
  
- 4° Abra um novo terminal de comando dentro do diretório *processo-seletivo-shopper/app/frontend*(Abrir terminal integrado) rode os comandos abaixo;

<details>
<summary>Imagem: Deretório - processo-seletivo-shopper/app/frontend</summary>

![Abertura pelo terminal integrado](print-screens/Captura%20de%20tela%20de%202024-04-20%2014-44-10.png)

</details>

### Instalar as dependências(node_modules)</br>

``npm install``

### Rodar o sistema do Front-end</br>

``npm run dev``

Utilize o link: <http://127.0.0.1:3000> para acessar o Front-end e utilizar a ferramenta

## Imagens da execução do projeto

![Tela principal](print-screens/Captura%20de%20tela%20de%202024-04-20%2010-10-02.png)
![Tela erro no csv](print-screens/Captura%20de%20tela%20de%202024-04-20%2010-13-03.png)
![Tela csv correto](print-screens/Captura%20de%20tela%20de%202024-04-20%2010-10-08.png)
![Tela validações corretas](print-screens/Captura%20de%20tela%20de%202024-04-20%2010-10-19.png)
![Tela de erros na validações](print-screens/Captura%20de%20tela%20de%202024-04-20%2010-10-42.png)
![Tela secesso ao atualizar o db](print-screens/Captura%20de%20tela%20de%202024-04-20%2010-10-27.png)

## Considerações Finais

Espero que este guia seja útil para compreender a estrutura, funcionalidades e processo de instalação da Ferramenta de Atualização de Preços. Se surgirem dúvidas ou necessidades adicionais durante o desenvolvimento ou uso da ferramenta, estou à disposição para discutir e auxiliar no que for necessário.

Agradeço novamente pela oportunidade e confiança em meu trabalho. Estou ansioso para colaborar e tornar a experiência com a ferramenta tão eficiente e satisfatória quanto possível.

Atenciosamente, Gustavo Vieira.
