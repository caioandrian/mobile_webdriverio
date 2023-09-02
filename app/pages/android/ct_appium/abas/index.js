const Base = require('../../../base/android_base_page');
const el = require('./elements');

class CT_Appium_Abas extends Base{

    async valida_aba1(){
        await super.validateElementIsVisible(el.BODY.CONTEUDO_ABA1)
    }

    async clicar_aba2(){
        await super.validateElementIsVisible(el.BODY.LABEL_ABA2)
        await super.clickElement(el.BODY.LABEL_ABA2)
    }

    async valida_aba2(){
        await super.validateElementIsVisible(el.BODY.CONTEUDO_ABA2)
    }
}

module.exports = new CT_Appium_Abas();