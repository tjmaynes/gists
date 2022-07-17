import XCTest
import Quick
import Nimble

class AppTest: QuickSpec {
    override func spec() {
        describe("AppTest") {
            describe("smoke test") {
                it("should be able to run on launch") {
                    XCUIApplication().launch()
                }
            }
        }
    }
}
