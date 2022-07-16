//
//  DataManagerTestCase.swift
//  Huebly
//
//  Created by TJ Maynes on 9/26/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

import Foundation
import XCTest

class DataManagerTestCase : XCTestCase {
    func testManagedObjectContextExists() {
        XCTAssertNotNil(TMDataOperation.managedObjectContext);
    }

    func testSaveColorToDatabase(completion: @escaping TMSucessTask) -> Void {
        let red = "\(30.0)"
        let green = "\(10.0)"
        let blue = "\(20.0)"
        let alpha = "\(1.0)"
        let createdAt = Date()
        let updatedAt = createdAt
        let data = ["red": red, "green": green, "blue": blue, "alpha": alpha, "createdAt": createdAt, "updatedAt": updatedAt] as [String : Any]

        let color = Color.convertDictionary(toColor: data)
        print(color)

        TMDataManager.storeData(color) { result in completion(result) }
    }

    func testFetchDataForEntity() {
        testSaveColorToDatabase(completion: { result in
            XCTAssertTrue(result)
            if (result) {
                TMDataManager.fetchColors({ result in XCTAssertNotNil(result) })
            } else {
                XCTFail()
            }
        })
    }

    func testSaveDatabase() {
        testSaveColorToDatabase(completion: { result in
            XCTAssertTrue(result)
        })
    }
}
