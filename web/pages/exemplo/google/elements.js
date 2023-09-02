module.exports = ELEMENTS = {
    PAGINA: {
        IMG_GOOGLE: "#hplogo",
        DIV_LOGO: "#logo",
        INPUT_PESQUISA: "[name=q]",
        BTN_PESQUISA_GOOGLE: "[name=btnK]",
        TXT_OPCAO: (texto) => `//span[text()='${texto}']`
    },
    RESULTADO: {
        PRIMEIRO_LINK: "(//div[contains(text(), 'QA')]//ancestor::a)[1]",
        SEGUNDO_LINK: "(//div[contains(text(), 'QA')]//ancestor::a)[2]"
    }
}