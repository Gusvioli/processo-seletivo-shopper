# Desenvolvimento da Ferramenta de Atualização de Preços

## Introdução

Olá, Shopper(a)! Agradeço pela oportunidade. Neste readme, delinearei as etapas para a execução da ferramenta de atualização de preços.

## Estrutura do Sistema

A estrutura do sistema será a seguinte:

- Back-end em Node.js, Express, JOI, Mysql2 e Dotenv para aplicar as regras e lógica de negócio e utilização do sistema.
- Front-end em React.js(Vite) e Axios para a interface do usuário interagir com a ferramenta e funcionamento do sistema com ligação ao Back-end.
- Linguagem preferencial: TypeScript.
- Banco de dados MySQL (versão 8) para armazenar informações sobre produtos, pacotes e preços, utilize o docker para subir o conteiner do Mysql(O Back-end é responsavel por criar a database, tabelas e popular o banco de dados).

### Variáveis de ambientes

Variável  | Valor
--------- | ------
DB_USER   | root
DB_PASS   | 123456
DB_HOST   | localhost
DB_NAME   | shopper
DB_PORT   | 3002

## Funcionalidades

Vou detalhar as funcionalidades da ferramenta:

1. Upload do arquivo CSV de precificação.
2. Botão "VALIDAR" para verificar a integridade dos dados.
3. Exibição das informações dos produtos validados: Código, Nome, Preço Atual, Novo Preço.
4. Identificação das regras quebradas, se houver, ao lado de cada produto.
5. Botão "ATUALIZAR" habilitado apenas se todos os produtos estiverem validados e sem regras quebradas.
6. Ao clicar em "ATUALIZAR", os novos preços são salvos no banco de dados e a ferramenta está pronta para um novo arquivo.
7. Atualização automática dos preços de custo dos pacotes conforme a soma dos custos dos componentes.

## Instalação e execução do sistema

**Obs: Antes de instalar e executar o sistema, verifique se as portas 3000, 3001 e 3002 estão desocupadas.**

- 1° Abra o terminal de comando dentro do diretório PROCESSO-SELETIVO-SHOPPER rode o comando: ``npm run start``
- 2° Abra um novo terminal de comando dentro do dentro do diretório frontend(Abrir terminal integrado) rode o comandp ``npm run dev``

## Imagens da execução doprojeto

![Tela principal](print-screens/Captura%20de%20tela%20de%202024-04-20%2010-10-02.png)
![Tela erro no csv](print-screens/Captura%20de%20tela%20de%202024-04-20%2010-13-03.png)
![Tela csv correto](print-screens/Captura%20de%20tela%20de%202024-04-20%2010-10-08.png)
![Tela validações corretas](print-screens/Captura%20de%20tela%20de%202024-04-20%2010-10-19.png)
![Tela de erros na validações](print-screens/Captura%20de%20tela%20de%202024-04-20%2010-10-42.png)
![Tela secesso ao atualizar o db](print-screens/Captura%20de%20tela%20de%202024-04-20%2010-10-27.png)

## Considerações Finais

Espero que este esboço seja útil para entender a complexidade e os requisitos da ferramenta. Fico à disposição para discutir qualquer aspecto adicional que possa surgir durante o desenvolvimento.
