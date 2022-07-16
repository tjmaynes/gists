//
//  ToDoItemTests.swift
//  TodoApp
//
//  Created by TJ Maynes on 10/23/16.
//  Copyright © 2016 TJ Maynes. All rights reserved.
//

import XCTest
@testable import TodoApp

class ToDoItemTests: XCTestCase {

  override func setUp() {
    super.setUp()
  }

  override func tearDown() {
    super.tearDown()
  }

  func testInit_ShouldTakeTitle() {
    let item = ToDoItem(title: "Test title")
    XCTAssertEqual(item.title, "Test title")
  }

  func testInit_ShouldTakeTitleAndDescription() {
    let item = ToDoItem(title: "Test Title", itemDescription: "Test Description")
    XCTAssertEqual(item.itemDescription, "Test Description")
  }

  func testInit_ShouldSetTitleAndDescriptionAndTimeStamp() {
    let item = ToDoItem(title: "Test title", itemDescription: "Test Description", timestamp: 0.0)

    XCTAssertEqual(0.0, item.timestamp, "Initializer should set the timestamp")
  }

  func testInit_ShouldSetTitleAndDescriptionAndTimestampAndLocation() {
    let location = Location(name: "Test name")
    let item = ToDoItem(title: "Test Title", itemDescription: "Test Description", timestamp: 0.0, location: location)

    XCTAssertEqual(location.name, item.location?.name, "Initiaizer should set the location")
  }

  func testEqualItems_ShouldBeEqual() {
    let firstItem = ToDoItem(title: "First item", itemDescription: "First Decription", timestamp: 1.0)
    let secondItem = ToDoItem(title: "First item", itemDescription: "First Decription", timestamp: 1.0)

    XCTAssertEqual(firstItem, secondItem)
  }

  func testWhenLocationDiffers_ShouldNotBeEqual() {
    let firstItem = ToDoItem(title: "First item", itemDescription: "First Decription", timestamp: 0.0, location: Location(name: "Home"))
    let secondItem = ToDoItem(title: "First item", itemDescription: "First Decription", timestamp: 0.0, location: Location(name: "Office"))

    XCTAssertNotEqual(firstItem, secondItem)
  }

  func testWhenOneLocationIsNilAndTheOtherIsnt_ShouldBeNotEqual() {
    let firstItem = ToDoItem(title: "First item", itemDescription: "First Decription", timestamp: 0.0, location: nil)
    let secondItem = ToDoItem(title: "First item", itemDescription: "First Decription", timestamp: 0.0, location: Location(name: "Office"))

    XCTAssertNotEqual(firstItem, secondItem)
  }

  func testWhenTimestampDifferes_ShouldBeNotEqual() {
    let firstItem = ToDoItem(title: "First item", itemDescription: "First Decription", timestamp: 1.0)
    let secondItem = ToDoItem(title: "First item", itemDescription: "First Decription", timestamp: 0.0)

    XCTAssertNotEqual(firstItem, secondItem)
  }

  func testWhenDescriptionDifferes_ShouldBeNotEqual() {
    let firstItem = ToDoItem(title: "First item", itemDescription: "First Decription", timestamp: 1.0)
    let secondItem = ToDoItem(title: "First item", itemDescription: "Second Decription", timestamp: 1.0)

    XCTAssertNotEqual(firstItem, secondItem)
  }

  func testWhenTitleDifferes_ShouldBeNotEqual() {
    let firstItem = ToDoItem(title: "First item", itemDescription: "First Decription", timestamp: 1.0)
    let secondItem = ToDoItem(title: "Second item", itemDescription: "First Decription", timestamp: 1.0)

    XCTAssertNotEqual(firstItem, secondItem)
  }

}
