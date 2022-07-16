import VideoCaptureWrapper
import AVFoundation

public protocol VideoCaptureType {
    init(using videoCaptureData: VideoCaptureData, objectRecognition: ObjectRecognitionType, delegate: VideoCaptureDelegate)
    func requestAuthorization(_ onCompletion: @escaping (Bool) -> Void)
    func record(onSuccess: @escaping ((UIView, AVCaptureSession) -> Void), onFailure: @escaping ((String) -> Void))
}

public protocol VideoCaptureDelegate: class {
    func didFinishImageRecognition(result: RecognitionResult)
}

public class VideoCaptureRecognition: VideoCaptureType {
    private let videoCaptureWrapper: VideoCaptureWrapper

    public required init(using videoCaptureData: VideoCaptureData, objectRecognition: ObjectRecognitionType, delegate: VideoCaptureDelegate) {
        let videoCaptureHandler = VideoCaptureHandler(using: objectRecognition, delegate: delegate)
        self.videoCaptureWrapper = VideoCaptureWrapper(videoCaptureData: videoCaptureData, captureDelegate: videoCaptureHandler)
    }
    
    public func requestAuthorization(_ onCompletion: @escaping (Bool) -> Void) {
        self.videoCaptureWrapper.requestAuthorization(onCompletion)
    }

    public func record(onSuccess: @escaping ((UIView, AVCaptureSession) -> Void), onFailure: @escaping ((String) -> Void)) {
        self.videoCaptureWrapper.record(onCompletion: { result in
            switch result {
            case .success(let view, let session):
                onSuccess(view, session)
            case .inputDeviceFailure(let deviceDescription):
                onFailure(deviceDescription)
            case .noDevicesFailure:
                onFailure("No devices were found...")
            }
        })
    }
}
