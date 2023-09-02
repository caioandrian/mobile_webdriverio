const Base = require('../../../base/android_base_page');
const el = require('./elements');

class CT_Appium_Menu extends Base{

    async acessar_submenu_abas(){
        await super.clickElement(el.MENU.FN_TXT_SUBMENU("Abas"))
    }

    async acessar_submenu_dragndrop(){
        await super.screenScrollDownElement(el.MENU.DIV)
        await super.clickElement(el.MENU.FN_TXT_SUBMENU("Drag and drop"))
    }

    async acessar_submenu_formulario(){
        await super.clickElement(el.MENU.FN_TXT_SUBMENU("Formulário"))
    }
}

module.exports = new CT_Appium_Menu();