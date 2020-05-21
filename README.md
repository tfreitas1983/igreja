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

- Implementar o upload de fotos com preview utilizando multer no back-end (svg, jpg, jpeg, png, gif, tiff) com limite de tamanho
- Implementar relatório de aniversariantes do mês
- Salvar relatórios em PDF, CSV
- Imprimir relatórios
- Paginar a lista de membros
- Mudar a lista de membros com checkbox para apagar em lote
- Criar login
- Implementar o contas a pagar
- Implementar o contas a receber
- Implementar o upload múltiplo de arquivos com drag n' drop
- Implementar relatório de receitas/despesas
- Implementar os filtros nos relatórios
- Criar permissões por login
- Criar Dashboard com contadores e gráficos
- Aniversariante do dia
- Autocompletar na busca
- Linha do tempo do membro (consagrações)
- Doações com cartão
- Selecionar área da imagem com zoom e recorte
- Implementar a captura de fotos pela câmera
- LOG de/para

[ Melhorias front-end ]

- Buscar endereço pelo CEP
- Marcar os inativos com a cor vermelha
- Mostrar o calendar nos campos data
- Toast depois de salvar/alterar com timer para redirecionar
- Criar colunas no cadastro e edição responsivos
- Validações:
  - Nome sem receber números