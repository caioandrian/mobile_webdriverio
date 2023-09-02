# language: pt

Funcionalidade: Visitar Google
    Como usuário do google
    Quero fazer uma pesquisa

    Contexto:
        Dado que tenha acessado na home do google

    Cenário: Validar Logo
        Então deverá ter aparecido a logo do google

    Cenário: Validar pesquisa
        Quando fizer uma pesquisa pelo campo de pesquisar
        Então deverá apresentar os resultados

