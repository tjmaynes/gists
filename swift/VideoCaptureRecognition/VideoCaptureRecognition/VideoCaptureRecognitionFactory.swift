import VideoCaptureWrapper
import AVFoundation
import CoreML

public struct VideoCaptureRecognitionPayload {
    public let frameSize: CGRect
	public let alwaysDiscardsLateVideoFrames: Bool
    public let mediaType: AVMediaType
    public let sessionPreset: AVCaptureSession.Preset
    public let mlModel: MLModel
    
    public init(frameSize: CGRect, alwaysDiscardsLateVideoFrames: Bool, mediaType: AVMediaType, sessionPreset: AVCaptureSession.Preset, mlModel: MLModel) {
        self.frameSize = frameSize
        self.alwaysDiscardsLateVideoFrames = alwaysDiscardsLateVideoFrames
        self.mediaType = mediaType
        self.sessionPreset = sessionPreset
        self.mlModel = mlModel
    }
}

public protocol VideoCaptureRecognitionFactoryType {
    static func create(payload: VideoCaptureRecognitionPayload, delegate: VideoCaptureDelegate) -> VideoCaptureType
}

public class VideoCaptureRecognitionFactory: VideoCaptureRecognitionFactoryType {
    public static func create(payload: VideoCaptureRecognitionPayload, delegate: VideoCaptureDelegate) -> VideoCaptureType {
        let device = AVCaptureDevice.default(for: payload.mediaType)
        let videoCaptureData = VideoCaptureData(device: device, sessionPreset: payload.sessionPreset, frameSize: payload.frameSize, alwaysDiscardsLateVideoFrames: payload.alwaysDiscardsLateVideoFrames)
        let objectRecognition = ObjectRecognition(model: payload.mlModel)
        return VideoCaptureRecognition(using: videoCaptureData, objectRecognition: objectRecognition, delegate: delegate)
    }
}
