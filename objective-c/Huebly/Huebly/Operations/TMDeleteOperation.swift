//
//  TMDeleteOperation.swift
//  Huebly
//
//  Created by TJ Maynes on 9/24/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

import Foundation

@objc public class TMDeleteOperation : TMDataOperation {
    var managedObject : NSManagedObject

    init(withManagedObject managedObject: NSManagedObject) {
        self.managedObject = managedObject
        super.init()
    }

    override public func start() {
        super.start()

        let managedObjectContext = TMDataOperation.managedObjectContext()
        managedObjectContext?.delete(self.managedObject)

        self.finish()
    }
}
