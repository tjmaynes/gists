import XCTest
@testable import Game

class GameViewControllerTests: XCTestCase {
    private let questions = [
        GameQuestion(question: "Four + Two is equal to Six", answer: true),
        GameQuestion(question: "Five - Three is greater than One", answer: true),
        GameQuestion(question: "Three + Eight is less than Ten", answer: false)
    ]

    private var sut: GameViewController!
    
    override func setUp() {
        super.setUp()

        guard let gameViewController = UIStoryboard(name: "Main", bundle: Bundle.main).instantiateInitialViewController() as? GameViewController else {
            fatalError("Unable to Instantiate GameViewController")
        }
        gameViewController.viewModel = GameViewModel(store: GameStore(questions: questions, pickerStrategy: { questions in questions.first }))

        sut = gameViewController
        _ = sut.view
    }

    func test_whenUserTapsOnTheCorrectAnswerToQuestion_itShouldSetTheButtonToGreen() {        
        XCTAssertEqual(sut.questionLabel.text, "Four + Two is equal to Six")
        sut.trueButton.tap()

        XCTAssertEqual(sut.trueButton.backgroundColor, UIColor.green)
        XCTAssertEqual(sut.falseButton.backgroundColor, UIColor.clear)

        XCTAssertEqual(sut.questionLabel.text, "Five - Three is greater than One")
        sut.trueButton.tap()

        XCTAssertEqual(sut.trueButton.backgroundColor, UIColor.green)
        XCTAssertEqual(sut.falseButton.backgroundColor, UIColor.clear)
        
        XCTAssertEqual(sut.questionLabel.text, "Three + Eight is less than Ten")
        sut.falseButton.tap()

        XCTAssertEqual(sut.trueButton.backgroundColor, UIColor.clear)
        XCTAssertEqual(sut.falseButton.backgroundColor, UIColor.green)
    }
}

extension UIButton {
    func tap() { self.sendActions(for: .touchUpInside) }
}
