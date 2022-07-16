import XCTest

class AwesomeAppUITests: XCTestCase {

  func test_whenUserTapsThroughMoreThanTwoScreens_itShouldTakeThemToLastScreen() {
    let app = XCUIApplication()
    app.launch()

    XCTAssertTrue(app.staticTexts["First screen"].exists)
    app.buttons["Tap me!"].tap()

    XCTAssertTrue(app.staticTexts["Second screen"].exists)
    app.buttons["Tap me, again!"].tap()

    XCTAssertTrue(app.staticTexts["Third screen"].exists)
    app.buttons["One more time..."].tap()

    XCTAssertTrue(app.staticTexts["Final screen"].exists)
  }
}
