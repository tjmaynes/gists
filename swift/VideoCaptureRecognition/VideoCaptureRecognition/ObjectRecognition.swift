import CoreML
import Vision

public struct RecognitionResult: Codable {
    public let name: String
    public let confidence: Float
    public let errorMessage: String?
    
    public init(name: String = "", confidence: Float = 0.0, errorMessage: String? = "unable to load model") {
        self.name = name
        self.confidence = confidence
        self.errorMessage = errorMessage
    }
}

public protocol ObjectRecognitionType {
    init(model: MLModel, queue: DispatchQueue)
    func understand(image: CIImage, finishedPrediction: @escaping (RecognitionResult) -> Void)
}

public class ObjectRecognition: ObjectRecognitionType {
    private let model: MLModel
    private let queue: DispatchQueue

    public required init(model: MLModel, queue: DispatchQueue = DispatchQueue.global(qos: .userInteractive)) {
        self.model = model
        self.queue = queue
    }

    public func understand(image: CIImage, finishedPrediction: @escaping (RecognitionResult) -> Void) {
        guard let model = try? VNCoreMLModel(for: model) else {
            finishedPrediction(RecognitionResult(errorMessage: "unable to load model"))
            return
        }

        let handler = VNImageRequestHandler(ciImage: image)
        let request = VNCoreMLRequest(model: model, completionHandler: { request, error in
            guard
                let results = request.results as? [VNClassificationObservation],
                let topResult = results.first else {
                    finishedPrediction(RecognitionResult(name: "none", confidence: 0.0))
                    return
            }
            
            let result = RecognitionResult(name: topResult.identifier, confidence: topResult.confidence, errorMessage: error?.localizedDescription)
            DispatchQueue.main.async { finishedPrediction(result) }
        })

        self.queue.async {
            do {
                try handler.perform([request])
            } catch {
                print(error)
            }
        }
    }
}
