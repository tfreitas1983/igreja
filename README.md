## Aplicação fullstack utilizando MongoDB, NodeJs, React e BootStrap
<p align="center">
  <img src="https://img.shields.io/badge/Mongoose-5.9.10-blue.svg?colorB=449a45">
  <img src="https://img.shields.io/badge/React-16.13.1-blue.svg">
  <img src="https://img.shields.io/badge/Nodejs-12.16.1-blue.svg?colorB=90c53f">
  <img src="https://img.shields.io/badge/Express-4.17.1-blue.svg?colorB=47535e">
  <br/>
  <img src="./underconstruction.gif">
</p>

Projeto MERN Stack (MongoDB + Express Js + React Js+ Node Js) criando um cadastro de membros de uma igreja: listando, criando, alterando, deletando e também apagando todos os registros.

Back-end usando o express, mongoose e front-end com React e Bootstrap. 
Banco de dados MongoDB utilizado dentro do Docker. 
Instale o docker desktop ou docker toolbox se for Windows 7. Baixe a imagem do mongodb dentro do docker, ou instale o MongoDB diretamente. Para gerenciar o banco utilize o Robo 3T.



1° passo -> npm install
2° passo -> Na pasta back-end rode: npm run dev
3° passo -> Na pasta front-end rode: npm start
4° passo -> Acesse o http://localhost:8081

Próximas Etapas:
- Início do projeto - 29/04/2020
- CRUD de membros - FEITO - 12/05/2020
- Implementar o upload de fotos com preview utilizando multer no back-end (svg, jpg, jpeg, png, gif, tiff) com limite de tamanho 5 MB - FEITO 22/05/2020
- Implementar o cadastro do templo - FEITO 24/05/2020
- Implementar relatório de aniversariantes do mês - FEITO 25/05/2020
- Imprimir relatórios - FEITO 25/05/2020
- Paginar a lista de membros - FEITO 26/05/2020
- Implementar o contas a pagar
  - Criar despesa - FEITO 30/05/2020
  - Listar despesas - FEITO 31/05/2020
  - Editar despesa - FEITO 31/05/2020
- Implementar o contas a receber
  - Criar receita - FEITO 01/06/2020
  - Listar receitas - FEITO 01/06/2020
  - Editar receita - FEITO 01/06/2020
- Autocompletar na busca - FEITO 02/06/2020
- Implementar o upload múltiplo de arquivos com drag n' drop nas telas de contas a pagar e receber
  - Adicionar despesa - FEITO 09/06/2020
  - Adicionar receita - FEITO 09/06/2020
  - Editar despesa
  - Editar receita
- Implementar relatório de receitas/despesas
- Implementar os filtros nos relatórios
- Salvar relatórios em PDF, CSV
- Criar login
- Criar permissões por login
- Criar Dashboard com contadores e gráficos
- Aniversariante do dia

- Mudar a lista de membros com checkbox para apagar em lote
- Linha do tempo do membro (consagrações) com confirmação ao mudar o cargo
- Doações com cartão
- Recibo de doação por e-mail
- Implementar a captura de fotos pela câmera
- Selecionar área da imagem com zoom e recorte
- LOG de/para

[ Melhorias front-end ]

- Buscar endereço pelo CEP
- Marcar os inativos com a cor vermelha
- Mostrar o calendar nos campos data
- Toast depois de salvar/alterar com timer para redirecionar
- Criar colunas no cadastro e edição responsivos
- Validações:
  - Nome sem receber números
  - CPF e CNPJ
  - Datas