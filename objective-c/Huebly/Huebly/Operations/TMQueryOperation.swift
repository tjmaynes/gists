//
//  TMQueryOperation.swift
//  Huebly
//
//  Created by TJ Maynes on 9/24/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

import Foundation

@objc public class TMQueryOperation: TMDataOperation {
    var query: String

    typealias TMQueryOperationCompletionBlock = ([NSManagedObject]) -> Void
    var completion : (TMQueryOperationCompletionBlock)

    init(withQuery query: String, onCompletion completion:@escaping TMQueryOperationCompletionBlock) {
        self.query = query
        self.completion = completion

        super.init()
    }

    override public func start() {
        super.start()

        let managedObjectContext : NSManagedObjectContext = TMDataOperation.managedObjectContext()
        let fetchRequest = NSFetchRequest<NSFetchRequestResult>(entityName: self.query)
        let data = try! managedObjectContext.fetch(fetchRequest) as! Array<NSManagedObject>

        finishedCompletion(data: data)
    }

    private func finishedCompletion(data: Array<NSManagedObject>) {
        self.finish()
        self.completion(data)
    }
}
