# language: pt

Funcionalidade: Teste App - CT_APPIUM
    Como usuário do aplicativo
    Quero acessar e fazer operações dentro do aplicativo

    Cenário: Validar Abas
        Dado que tenha acessado o submenu abas
        Quando clicar na aba 2
        Então então deverá apresentar o conteúdo da aba 2

    Cenário: Validar Drag And Drop
        Dado que tenha acessado o submenu dragndrop
        #Quando arrastar o primeiro elemento do exemplo até o terceiro elemento
        #Então deverá ter alterado a ordem dos elementos no exemplo

    Cenário: Validar Preenchimento do Formulário
        Dado que tenha acessado o submenu formulário
        Quando preencher os dados no formulário
        Então então deverá apresentar os resultados salvos corretamente