var assert = require('assert');
var chai = require('chai');

//https://webdriver.io/docs/api/element/addValue
//https://webdriver.io/docs/api/expect-webdriverio
//https://www.chaijs.com/api/assert/
//https://nodejs.org/api/assert.html

module.exports = class Base {

    async explicitWait(seconds = 5){
        let time = seconds * 1000
        console.log("aguardando... " + seconds + " segundos")
        await browser.pause(time)
    }

    async getElement(elementID, index = 1){
        if(elementID.includes("new UiSelector()")){
            //Android UiAutomator
            //index = 0
            let element = await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(' + elementID + ")");
            await element.waitForExist();
            return await element
        }else{
            //Xpath
            //index = 1
            let element = await $(elementID + `[${index}]`);
            await element.waitForExist();
            return await element
        }
    }

    async getElementWithoutExist(elementID, index = 1){
        if(elementID.includes("new UiSelector()")){
            //Android UiAutomator
            //index = 0
            let element = await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(' + elementID + ")");
            return await element
        }else{
            //Xpath
            //index = 1
            let element = await $(elementID + `[${index}]`);
            return await element
        }
    }

    async getMultipleElementsByXpath(elementID){
        let element = await $$(elementID);
        return await element
    }

    async getElementLenghtByXpath(elementID) {
        await this.waitElementUntilExist(elementID)
        let elements = await this.getMultipleElementsByXpath(elementID)
        const quantidade = elements.length
        return quantidade
    }

    async getElementText(elementID) {
        await this.waitElementUntilExist(elementID)
        let element = await this.getElement(elementID)
        return element.getText()
    }

    async getElementAttribute(elementID, attr, index = 1) {
        let element = await this.getElement(elementID, index)
        return await element.getAttribute(attr);
    }
    
    async typeElement(elementID, text, index = 1){
        let element = await this.getElement(elementID, index)
        await element.clearValue();
        await element.addValue(text);
        //assert.equal(await element.getText(), text);
    }

    async sendKey(key){
        //Apenas para contexto WEB
        await this.explicitWait()
        await browser.keys(key)
        await this.explicitWait()
    }

    async sendKeyToElement(elementID, key){
        //Apenas para contexto WEB
        let element = this.getElement(elementID)
        await browser.keys("Delete")
        await browser.keys("Home")
        await browser.keys(key)
        console.log(await element.getValue())
    }

    async clickElement(elementID, index = 1){
        let myButton = await this.getElement(elementID, index)
        await myButton.click()
    }

    async slideHorizontalElement(elementID, def_value, index = 1){
        await this.validateElementIsVisible(elementID, index)

        let element = await this.getElement(elementID, index)
        let value = def_value
        let delta = 50
        let xStart = element.getLocation('x') + delta;
        let click_x = xStart + (element.getSize('width') -2 * delta) * value
        let click_y = element.getLocation('y') + (element.getSize('height') / 2)
        await driver.touchAction(['press', {action: 'moveTo', x: click_x, y: click_y}, 'release'])
    }

    async swipeScreenToLeftElement(elementID, value = 1, index = 1){
        //value 2 = half screen
        await this.validateElementIsVisible(elementID, index)
        const element = await this.getElement(elementID, index)

        const startX = await element.getLocation("x") + ((await element.getSize('width') - 10) / value);
        const endX = await element.getLocation("x") + 10;
        const y = await element.getLocation("y") + (await element.getSize('height') / 2);

        await driver.touchPerform([
            { action: 'press', options: { x: startX, y: y } },
            { action: 'wait', options: { ms: 1000 } },
            { action: 'moveTo', options: { x: endX, y: y } },
            { action: 'release' }
        ]);
    };

    async swipeScreenToRightElement(elementID, value = 1, index = 1){
        //value 2 = half screen
        const element = await this.getElement(elementID, index)

        const startX = await element.getLocation("x") + 10;
        const endX = await element.getLocation("x") + ((await element.getSize('width') - 10) / value);
        const y = await element.getLocation("y") + await element.getSize('height') / 2;

        await driver.touchPerform([
            { action: 'press', options: { x: startX, y: y } },
            { action: 'wait', options: { ms: 1000 } },
            { action: 'moveTo', options: { x: endX, y: y } },
            { action: 'release' }
        ]);
    };

    async screenScrollDownElement(elementID, value = 1, index = 1){
        //value 2 = half screen
        const element = await this.getElement(elementID, index)

        const startX = await element.getLocation("x") + await element.getSize('width') / 2;
        const startY = await element.getLocation("y") + ((await element.getSize('height') - 10 ) / value);
        const endY = await element.getLocation("y") + 10;

        await driver.touchPerform([
            { action: 'press', options: { x: startX, y: startY } },
            { action: 'wait', options: { ms: 1000 } },
            { action: 'moveTo', options: { x: startX, y: endY } },
            { action: 'release' }
        ]);
    };

    async screenScrollUpElement(elementID, value = 1, index = 1){
        //value 2 = half screen
        const element = await this.getElement(elementID, index)

        const startX = await element.getLocation("x") + await element.getSize('width') / 2;
        const startY = await element.getLocation("y") + 10;
        const endY = await element.getLocation("y") + ((await element.getSize('height') -10 ) / value);
        
        await driver.touchPerform([
            { action: 'press', options: { x: startX, y: startY } },
            { action: 'wait', options: { ms: 1000 } },
            { action: 'moveTo', options: { x: startX, y: endY } },
            { action: 'release' }
        ]);
    };

    async waitElementUntilExist(elementID, index = 1){
        let element = await this.getElement(elementID, index)
        await element.waitForExist();
    }

    async waitElementUntilEnabled(elementID, index = 1){
        let element = await this.getElement(elementID, index)
        await element.waitForEnabled();
    }

    async scrollIntoViewElement(elementID, index = 1){
        let element = await this.getElement(elementID, index)
        await element.scrollIntoView();
    }

    async validateElementByIsChecked(elementID, value_expected = true, index = 1){
        let myButton = await this.getElement(elementID, index)
        assert.ok(await myButton.getAttribute('checked'), value_expected)
    }

    async validateElementIsVisible(elementID, index = 1) {
        let element = await this.getElement(elementID, index)
        await element.waitForDisplayed();
        await element.isDisplayed(); 
    }

    async validateElementContainsText(elementID, expected, index = 1) {
        let element = await this.getElement(elementID, index)
        chai.assert.include(await element.getText(), expected)
    }

    async validateElementHaveText(elementID, text, index = 1) {
        let element = await this.getElement(elementID, index)
        await expect(element).toHaveText(text);
    }

    async validateElementNotHaveText(elementID, text, index = 1) {
        let element = await this.getElement(elementID, index)
        assert.notEqual(await element.getText(), text)
    }

    async validateElementLenghtByXpath(elementID, qtde) {
        await this.waitElementUntilExist(elementID)
        let elements = await this.getMultipleElementsByXpath(elementID)
        const quantidade = elements.length
        await assert.equal(quantidade, qtde, 'A quantidade de elementos não está correta.')
    }

    async validateElementIsEmpty(elementID, index = 1) {
        let element = await this.getElement(elementID, index)
        chai.assert.isEmpty(element)
    }

    async validateElementNotEmpty(elementID, index = 1) {
        let element = await this.getElement(elementID, index)
        chai.assert.isNotEmpty(element)
    }

    async validateElementIsClickable(elementID, index = 1){
        let element = await this.getElement(elementID, index)
        await element.toBeClickable();
    }

    async verifyElementIsVisible(elementID, index = 1) {
        let element = await this.getElementWithoutExist(elementID, index)
        return await element.isDisplayed();
    }

    async listContexts(){
        //id 0 = NATIVE_APP / 1 = WEBVIEW_1
        await driver.getContexts()
            .then(function (contexts) {
                console.log(contexts)
            })
    }

    async switchContext(id = 0){
        //id 0 = NATIVE_APP / 1 = WEBVIEW_1
        await driver.getContexts()
            .then(function (contexts) {
                console.log(contexts)
                return driver.switchContext(contexts[id]);
            })
    }

    async switchContextToDefault(){ 
        await browser.switchToFrame(null)
    }

    async switchContextByElement(elementID = null){
        let frame = await $(elementID)
        await browser.switchToFrame(frame)
    }

    async switchContextByElementAndIndex(elementID = null, index){
        let frame = await $$(elementID)[index]
        await browser.switchToFrame(frame)
    }
}
  