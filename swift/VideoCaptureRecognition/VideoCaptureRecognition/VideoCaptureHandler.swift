import AVFoundation

public class VideoCaptureHandler: NSObject, AVCaptureVideoDataOutputSampleBufferDelegate {
    private let objectRecognition: ObjectRecognitionType
    private weak var delegate: VideoCaptureDelegate? = nil
    
    public init(using objectRecognition: ObjectRecognitionType, delegate: VideoCaptureDelegate) {
        self.objectRecognition = objectRecognition
        self.delegate = delegate
    }
    
    public func captureOutput(_ output: AVCaptureOutput, didOutput sampleBuffer: CMSampleBuffer, from connection: AVCaptureConnection) {
        guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else { return }
        let attachments = CMCopyDictionaryOfAttachments(kCFAllocatorDefault, sampleBuffer, kCMAttachmentMode_ShouldPropagate) as? [String: Any]
        let image = CIImage(cvImageBuffer: pixelBuffer, options: attachments)
        
        self.objectRecognition.understand(image: image) { (result: RecognitionResult) in
            self.delegate?.didFinishImageRecognition(result: result)
        }
    }
}
