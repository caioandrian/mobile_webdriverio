const Base = require('../../base/base_page');
const el = require('./elements');

class Google_Home extends Base{
    
    async acessar_pagina(){
        await super.visit("www.google.com.br")
    }

    async pesquisar() {
        let busca = "teste de qa"
        await super.typeElement(el.PAGINA.INPUT_PESQUISA, busca)
        await super.clickElement(el.PAGINA.TXT_OPCAO(busca))
    }

    async valida_resultados(){
        await super.explicitWait(3000)
        //TODO VER PORQUE NO BROWSERSTACK É O PRIMEIRO LINK...
        await super.clickElement(el.RESULTADO.SEGUNDO_LINK)
        await super.explicitWait(3000)

        console.log("verificando div Testes por Camada")
        await super.validatePageContainsText("Testes por Camada")
        await super.explicitWait(3000)

        console.log("verificando div Quadrante dos Testes")
        await super.validatePageContainsText("Quadrante dos Testes")
        await super.explicitWait(3000)
    }

    async valida_logo() {
        await super.validateElementIsVisible(el.PAGINA.IMG_GOOGLE)
    }
}

module.exports = new Google_Home();