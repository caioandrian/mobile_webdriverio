const Base = require('../../../base/android_base_page');
const el = require('./elements');

class CT_Appium_DragNdrop extends Base{

    async valida_movimentacao(){
        await super.validateElementIsVisible(el.CONTEUDO.FRAME)
    }

    async teste(){
        await super.validateElementIsVisible(el.CONTEUDO.PRIMEIRO_TEXTO)
    }
}

module.exports = new CT_Appium_DragNdrop();