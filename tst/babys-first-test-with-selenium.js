import { type } from "os"
import {By, Builder, Browser} from "selenium-webdriver"
import assert from "assert"


(async function testXWin_diagonal_topLeftToBottomRight() {
    var clickOrder = ["cell-A1", "cell-C1", "cell-B2", "cell-C2", "cell-C3"]
    var expectedCellVals = ["x", "o", "x", "o", "x"]

    var driver;
    try {
        driver = await new Builder().forBrowser(Browser.FIREFOX).build()
    } catch (error) {
        print(type(error))
        await driver.quit()
    }
    await driver.manage().setTimeouts({ implicit : 3000 })
    await driver.get("https://staging.d2orucso22c6ii.amplifyapp.com/")

    for (var i=0; i<clickOrder.length; i++) {
        let cell = await driver.findElement(By.id(clickOrder[i]))
        await cell.click()

        let cellText = await cell.getText()
        assert.equal(cellText, expectedCellVals[i])
    }

    let cell = await driver.findElement(By.id("cell-B2"))
    let cellText = await cell.getText()
    assert.equal(cellText, "x is the winner")

    await driver.quit()
    return 0
}())
