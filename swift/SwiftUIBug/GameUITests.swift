import XCTest

class GameUITests: XCTestCase {

    override func setUpWithError() throws {
        continueAfterFailure = false
    }

    func test_whenUserGivesCorrectAnswers_shouldIndicateACorrectAnswer() throws {
        let app = XCUIApplication()
        app.launch()

        XCTAssert(app.staticTexts["Score: 0"].exists)

        XCTAssert(app.staticTexts["Four + Two is equal to Six"].waitForExistence(timeout: 1))
        app.buttons["True"].tap()
        XCTAssert(app.staticTexts["Score: 1"].exists)
        
        XCTAssert(app.staticTexts["Five - Three is greater than One"].exists)
        app.buttons["False"].tap()
        XCTAssert(app.staticTexts["Score: 1"].exists)

        XCTAssert(app.staticTexts["Three + Eight is less than Ten"].exists)
        app.buttons["True"].tap()
        XCTAssert(app.staticTexts["Score: 1 - Game over!"].exists)
    }
}
