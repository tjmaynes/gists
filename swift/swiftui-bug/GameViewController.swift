import UIKit
import Combine
import OrderedCollections

struct GameQuestion<T: Equatable>: Hashable {
    var question: String
    var answer: T
    
    func hash(into hasher: inout Hasher) {
        hasher.combine(question)
    }

    static func == (lhs: GameQuestion<T>, rhs: GameQuestion<T>) -> Bool {
        return lhs.question == rhs.question && lhs.answer == rhs.answer
    }
}

struct GameEngine<T: Equatable> {
    var score = 0
    var progress: Float {
        get { return 1 - Float(questionQueue.count) / Float(totalQuestionCount) }
    }
    
    private let totalQuestionCount: Int
    private let pickerStrategy: (OrderedSet<GameQuestion<T>>) -> GameQuestion<T>?
    
    private var selectedQuestion: GameQuestion<T>?
    private var questionQueue: OrderedSet<GameQuestion<T>>

    init(allQuestions: OrderedSet<GameQuestion<T>>, pickerStrategy: @escaping (OrderedSet<GameQuestion<T>>) -> GameQuestion<T>?) {
        self.questionQueue = allQuestions
        self.totalQuestionCount = allQuestions.count
        self.pickerStrategy = pickerStrategy
    }

    mutating func nextQuestion() -> GameQuestion<T>? {
        if let question = pickerStrategy(questionQueue) {
            selectedQuestion = questionQueue.remove(question)
            return selectedQuestion
        } else {
            return nil
        }
    }

    mutating func isCorrect(answer: T) -> Bool {
        let isCorrectAnswer = selectedQuestion?.answer == answer
        if isCorrectAnswer { score += 1 }

        return isCorrectAnswer
    }
}

class GameViewModel {
    private var store: GameEngine<Bool>

    @Published var question: String!
    @Published var scoreText: String! = "Score: 0"
    @Published var progress: Float = 0.0
    @Published var trueButtonColor: UIColor? = UIColor.clear
    @Published var falseButtonColor: UIColor? = UIColor.clear
    @Published var enableTrueButton: Bool = true
    @Published var enableFalseButton: Bool = true

    init(store: GameEngine<Bool>) {
        self.store = store
        self.question = self.store.nextQuestion()!.question
    }

    func checkAnswer(_ answer: Bool) {
        enableTrueButton = false
        enableFalseButton = false

        let isCorrect = store.isCorrect(answer: answer)

        if answer {
            trueButtonColor = isCorrect ? UIColor.green : UIColor.red
        } else {
            falseButtonColor = isCorrect ? UIColor.green : UIColor.red
        }

        progress = store.progress
        scoreText = progress < 1 ? "Score: \(store.score)" : "Score: \(store.score) - Game over!"
    }

    func nextQuestion() {
        if let gameQuestion = self.store.nextQuestion() {
            question = gameQuestion.question

            trueButtonColor = UIColor.clear
            enableTrueButton = true
            
            falseButtonColor = UIColor.clear
            enableFalseButton = true
        }
    }
}

class GameViewController: UIViewController {
    @IBOutlet weak var questionLabel: UILabel!
    @IBOutlet weak var progressBar: UIProgressView!
    @IBOutlet weak var trueButton: UIButton!
    @IBOutlet weak var falseButton: UIButton!
    @IBOutlet weak var scoreLabel: UILabel!

    var viewModel: GameViewModel!

    private var selectedQuestionSubscriber: AnyCancellable?
    private var progressBarSubscriber: AnyCancellable?
    private var scoreSubscriber: AnyCancellable?
    private var trueButtonColorSubscriber: AnyCancellable?
    private var falseButtonColorSubscriber: AnyCancellable?
    private var enableTrueButtonSubscriber: AnyCancellable?
    private var enableFalseButtonSubscriber: AnyCancellable?
    
    override func viewDidLoad() {
        super.viewDidLoad()

        selectedQuestionSubscriber = viewModel.$question
            .receive(on: DispatchQueue.main)
            .assign(to: \.text, on: questionLabel!)

        progressBarSubscriber = viewModel.$progress
            .receive(on: DispatchQueue.main)
            .assign(to: \.progress, on: progressBar)
        
        scoreSubscriber = viewModel.$scoreText
            .receive(on: DispatchQueue.main)
            .assign(to: \.text, on: scoreLabel!)

        trueButtonColorSubscriber = viewModel.$trueButtonColor
            .receive(on: DispatchQueue.main)
            .assign(to: \.backgroundColor, on: trueButton)
        
        falseButtonColorSubscriber = viewModel.$falseButtonColor
            .receive(on: DispatchQueue.main)
            .assign(to: \.backgroundColor, on: falseButton)

        enableTrueButtonSubscriber = viewModel.$enableTrueButton
            .receive(on: DispatchQueue.main)
            .assign(to: \.isEnabled, on: trueButton)

        enableFalseButtonSubscriber = viewModel.$enableFalseButton
            .receive(on: DispatchQueue.main)
            .assign(to: \.isEnabled, on: falseButton)
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        
        selectedQuestionSubscriber?.cancel()
        progressBarSubscriber?.cancel()
        scoreSubscriber?.cancel()
        trueButtonColorSubscriber?.cancel()
        falseButtonColorSubscriber?.cancel()
        enableTrueButtonSubscriber?.cancel()
        enableFalseButtonSubscriber?.cancel()
    }

    @IBAction func answerButtonPressed(_ sender: UIButton) {
        viewModel.checkAnswer(sender.tag == 0)

        Timer.scheduledTimer(timeInterval: 0.2, target: self, selector: #selector(nextQuestion), userInfo: nil, repeats: false)
    }

    @objc func nextQuestion() { viewModel.nextQuestion() }
}