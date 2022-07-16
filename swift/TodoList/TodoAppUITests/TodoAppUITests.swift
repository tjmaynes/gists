//
//  TodoAppUITests.swift
//  TodoAppUITests
//
//  Created by TJ Maynes on 2/17/20.
//  Copyright © 2020 TJ Maynes. All rights reserved.
//

import XCTest

class TodoAppUITests: XCTestCase {
    override func setUp() {
        continueAfterFailure = false
    }

    override func tearDown() {}

    func testExample() {
        let app = XCUIApplication()
        app.launch()
    }
}
