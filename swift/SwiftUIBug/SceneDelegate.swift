import UIKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let _ = (scene as? UIWindowScene) else { return }
        
        if let gameViewController = window?.rootViewController as? GameViewController {
            gameViewController.viewModel = GameViewModel(store: GameEngine(
                allQuestions: OrderedSet([
                    GameQuestion(question: "Four + Two is equal to Six", answer: true),
                    GameQuestion(question: "Five - Three is greater than One", answer: true),
                    GameQuestion(question: "Three + Eight is less than Ten", answer: false)
                ]),
                pickerStrategy: { questions in questions.first }
            ))
        }
    }

}