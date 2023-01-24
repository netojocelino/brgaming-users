# Desafio DEV FRONTEND BRGaming

Criação de sistema de cadastro de usuários. A persistência dos dados pode ser feita da forma que o desenvolvedor achar melhor (não precisa necessariamente de utilizar um backend e de um banco de dados).

> Foi utilizado `localStorage` para preencher os dados, com os usuários e senha:

- admin | password123
- sales | password1234

Necessário enviar a [URL do sistema](https://brgaming-user.vercel.app/) publicado em algum servidor e o [link para o repositório](https://github.com/netojocelino/brgaming-users)

## Tela de Login

Tela para logar com usuários criados.

## Menus laterais

Todas as telas, com exceção do login, devem conter um template com os seguintes menus laterais:

- Usuários
- Minha loja (visível apenas para usuário nível LOJISTA)
- Operação (visível apenas para usuário nível ADMIN)

A cor de fundo do menu é determinado pelo campo “CorDeFundo” do usuário logado

## Tela de usuário

Tela de CRUD de usuários.
Somente usuários do nível ADMIN podem deletar usuários
Somente usuários do nível ADMIN podem criar outros usuários do nível ADMIN
Cadastro deve conter os seguintes campos:

- Nome
- Telefone
- Login
- Senha
- Nível (ADMIN, LOJISTA)
- Cor de fundo

## Tela “Minha loja”

Visível apenas para usuário nível LOJISTA
Exibir somente um h1 escrito “Minha loja”

## Tela “Operação”

Visível apenas para usuário nível ADMIN
Exibir somente um h1 escrito “Operação”
