# Projeto Engenharia Web: Mapas das Ruas de Braga

## Composição do Grupo 43

- a95128, Ana João da Rocha Alves
- a100893, Luís de Castro Rodrigues Caetano
- a100597, Simão Pedro Ferrereira Antunes

## Introdução

No âmbito da Unidade Curricular de Engenharia Web, foi proposto um projeto que visava aplicar todos os conhecimentos aprendidos ao longo da mesma.

Através de um dataset fornecido, teríamos de desenvolver todas as componentes que nos permitissem chegar a uma site web capaz de satisfazer os requisitos propostos.

## Escolha do tema

Em primeiro lugar foi necessário escolher um tema pelo que a terceira proposta: Mapas das Ruas de Braga, foi que nos agradou mais. Ficamos assim com um dataset à nossa disposição composto por 60 Ficheiros XML, cada um com a informação de cada rua diferente: casas, proprietários, rendas, etc. Cada página contaria também com uma dicotomia de imagens: umas correspondentes à digitalização dos desenhos originais do séc. XVIII e outras correspondentes a um trabalho de campo realizado por alunos de engenharia biomédica que fotografaram as ruas na atualidade.

## Requesitos

Para o nosso site web, os requisitos propostos mínimos foram os seguintes:

- Analisar o dataset fornecido e tratá-lo de modo a carregá-lo no MongoDB ou noutro sistema de dados;
- Criar uma interface web de navegação em toda a informação disponibilizada;
- Permitir adicionar novos registos;
- Ter a possibilidade de navegar por nome (índice antroponímico), por lugar (índice toponímico) e data (índice cronológico);
- Permitir que um utilizador edite a informação de um registo:
- Podendo substituir imagens, alterar campos, ...
- Permitir que um utilizador faça um Post sobre um registo;
- Permitir que os outros utilizadores comentem Posts;
- O sistema deverá estar protegido com autenticação: username+password, chaveAPI, google, facebook, ...
- Deverão existir pelo menos 2 níveis de acesso:
- Administrador - tem acesso a todas as operações;
- Consumidor - pode consultar, fazer posts e sugerir alterações;
- Dados sobre o utilizador a guardar (sugestão):
nome, email, filiação (estudante, docente, curso, departamento, ...), nível (administrador, produtor ou consumidor), dataRegisto (registo na plataforma), dataUltimoAcesso, password, outros campos que julgue necessários…

## Análise e tratamento do Dataset

A primeira etapa do projeto consistiu na análise dos ficheiros fornecidos contendo informações relevantes sobre cada rua. Foi necessário compreender a estrutura dos dados que se encontravam em ficherios xml(localizados na pasta "texto"), identificar os campos relevantes e mapeá-los para uma estrutura adequada para armazenamento no MongoDB. Para isso usamos o toJson.py que convertes os ficheiros mencionados num único documento em json. Para além disso, consideramos necessário um identificador único para cada rua, sendo considerado também na estruturação do dataset.
Relativamente às imagens utilizadas em cada rua, o ficheiro json terá contido o caminho para cada uma delas.

## Implementação

Tendo os objetivos em conta, decidimos em primeiro lugar estruturar o nosso trabalho.
Para este efeito dividimo-lo, à semelhança do que foi desenvolvido nas aulas, em três pastas diferentes: interface, auth e api. 

| Tipo      | Argumentos                                                                                                                |
|-----------|----------------------------------------------------------------------------------------------------------------------------|
| mongodb   | O serviço "mongodb" é baseado na imagem oficial do MongoDB obtida a partir do Docker. Ele é responsável por armazenar os dados do projeto. |
| api       | O serviço "api" é responsável pela lógica de backend e pela comunicação com a base de dados. É apenas dependente do serviço anterior. |
| auth      | O serviço "auth" lida com a autenticação, autorização e registo dos utilizadores. Tal como a api é dependente do serviço mongodb. |
| interface | O serviço "interface" é responsável pela interface web do projeto. É o único aberto ao exterior sendo através dele que toda a interação entre os serviços é despoletada. Sendo assim é dependente dos serviços api e auth. |


Assim, respetivamente teríamos uma secção ligada ao front end, à autenticação e aos pedidos de dados.
Para criarmos cada uma delas, foi usado o comando ``npx express-generator --view=pug <folder>``, que cria uma aplicação Express.

Tendo o nosso dataset em json, o passo seguinte será correr o MongoDB num Docker através do comando ``sudo docker run -d -p 27017:27017 --name <name> mongo``. De seguida copiar o nosso dataset, neste caso o `ruas.json`, para dentro do docker, através do comando ``docker cp ruas.json <name>:/tmp`` e finalmente correr o comando ``docker exec <name> mongoimport -d <dbname> -c <collectionname> /tmp/ruas.json --jsonArray`` para importar o ruas.json para a base de dados MongoDB que está a correr no Docker.

### API de dados

A nossa API responde na porta 3001 e atua sobre a `model` que definimos tendo em conta os parâmetros de cada entrada do nosso ficheiro `.json`.

Seguimos o CRUD, ou seja, as quatro operações básicas do desenvolvimento de uma aplicação, contando com os métodos GET, POST, PUT e DELETE.

Todas estas operações serão aplicadas perante a nossa `module` e, na componente `controllers`,teremos métodos para listar, seja pelo Nome ou pelo Número, inserir uma rua, remover e atualizá-la.

Estes métodos serão chamados pela nossa `routes` que os usa para o respetivo pedido de operação de CRUD.

Estas serão as operações com que a nossa API operará, pelo que a nossa interface as usará.

### Autênticação

Para a autenticação, implementamos um serviço que lida com o registo, login e autorização dos utilizadores. Este serviço é essencial para garantir que apenas utilizadores autenticados possam interagir com o nosso sistema. Desta forma, para este componente, foram essenciais ter em consideração tópicos como o registo dos utilizadores com credenciais próprias, a realização do login com essas mesmas credenciais (com a combinação de JWT (JSON Web Tokens) para a gestão de sessões, garantindo uma autenticação segura e eficiente) e a autorização e segurança com base no acesso.

### Interface

A interface web do projeto é a única componente aberta ao exterior, sendo através dela que todas as interações entre os utilizadores e o sistema ocorrem. Esta interface foi desenvolvida utilizando o framework Express com a engine de templates Pug, permitindo uma navegação intuitiva e responsiva.
Para esta estrutura foram tidos em conta a estrutura e navegação que pode ser demonstrativa na navegação do utilizador, gestão de registos e proteção e acesso.


#### Funcionalidades

| Requisito                                | Descrição                                                              | Comentário                                                                                                                                                                  |
|------------------------------------------|------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Login                                    | O utilizador deve ser capaz de se autenticar no sistema.                |                                                                                                                                                                             |
| Registo                                  | O utilizador deve ser capaz de se registar no sistema.                  |                                                                                                                                                                             |                                            |                                         |
| Aceder a uma Rua                         | O utilizador deve ser capaz de aceder a informação de uma dada rua.   |                                                                                                                                                                             |
| Editar informações de um Rua             | O utilizador pode editar informações de uma rua |                                                                                                                                                                             |




## Conclusão

O projeto desenvolvido para a Unidade Curricular "Engenharia Web" da Universidade do Minho apresenta uma solução para a organização e disponibilização de um mapa das Ruas de Braga. Utilizando a tecnologia Docker, foi possível criar um ambiente que suporta a implantação da aplicação.

Através dos serviços "api", "auth" e "interface", foi implementada uma arquitetura completa que abrange desde a lógica de backend até a interface web. A integração com o MongoDB permite o armazenamento enquanto a interface web facilita a navegação e pesquisa dos dados.

Em resumo, o projeto atendeu aos objetivos propostos, oferecendo uma solução robusta para a representação e processamento de conhecimento na web.
