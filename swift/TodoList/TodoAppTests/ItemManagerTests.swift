//
//  ItemManagerTests.swift
//  TodoApp
//
//  Created by TJ Maynes on 10/23/16.
//  Copyright © 2016 TJ Maynes. All rights reserved.
//

import XCTest
@testable import TodoApp

class ItemManagerTests: XCTestCase {

  var sut: ItemManager!

  override func setUp() {
    super.setUp()
    sut = ItemManager()
  }

  override func tearDown() {
    super.tearDown()
  }

  func testToDoCount_Initially_ShouldBeZero() {
    XCTAssertEqual(sut.toDoCount, 0, "Initially toDo count should be 0")
  }

  func testDoneCount_Initially_ShouldBeZero() {
    XCTAssertEqual(sut.doneCount, 0, "Initially done count should be 0")
  }

  func testToDoCount_AfterAddingOneItem_IsOne() {
    sut.addItem(ToDoItem(title: "Test title"))
  }

  func testItemAtIndex_ShouldReturnPreviouslyAddedItem() {
    let item = ToDoItem(title: "Item")
    sut.addItem(item)

    let returnedItem = sut.itemAtIndex(0)
    XCTAssertEqual(item.title, returnedItem.title, "should be the same item")
  }

  func testCheckingItem_ChangesCountOfToDoAndOfDoneItems() {
    sut.addItem(ToDoItem(title: "First Item"))
    sut.checkItemAtIndex(0)

    XCTAssertEqual(sut.toDoCount, 0, "toDoCount should be 0")
    XCTAssertEqual(sut.doneCount, 1, "toDoCount should be 1")
  }

  func testCheckingItem_RemovesItFromTheToDoItemList() {
    let firstItem = ToDoItem(title: "First")
    let secondItem = ToDoItem(title: "Second")

    sut.addItem(firstItem)
    sut.addItem(secondItem)

    sut.checkItemAtIndex(0)

    XCTAssertEqual(sut.itemAtIndex(0).title, secondItem.title)
  }

  func testDoneItemAtIndex_ShouldReturnPreviouslyCheckedItem() {
    let firstItem = ToDoItem(title: "First")
    sut.addItem(firstItem)
    sut.checkItemAtIndex(0)

    let returnedItem = sut.doneItemAtIndex(0)
    XCTAssertEqual(firstItem.title, returnedItem.title, "should be the same")
  }

  func testRemoveAllItems_ShouldResultInCountsBeZero() {
    let firstItem = ToDoItem(title: "First")
    sut.addItem(firstItem)

    let secondItem = ToDoItem(title: "Second")
    sut.addItem(secondItem)

    sut.checkItemAtIndex(0)

    XCTAssertEqual(sut.toDoCount, 1, "toDoCount should be 1")
    XCTAssertEqual(sut.doneCount, 1, "toDoCount should be 1")

    sut.removeAllItems()

    XCTAssertEqual(sut.toDoCount, 0, "toDoCount should be 0")
    XCTAssertEqual(sut.doneCount, 0, "toDoCount should be 0")
  }

  func testAddingTheSameItem_DoesNotIncreaseCount() {
    let firstItem = ToDoItem(title: "First")
    sut.addItem(firstItem)

    let secondItem = ToDoItem(title: "First")
    sut.addItem(secondItem)

    XCTAssertEqual(sut.toDoCount, 1, "toDoCount should be 1")
  }

}
