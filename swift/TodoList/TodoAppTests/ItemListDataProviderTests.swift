//
//  ItemListDataProviderTests.swift
//  TodoApp
//
//  Created by TJ Maynes on 12/15/16.
//  Copyright © 2016 TJ Maynes. All rights reserved.
//

import XCTest
@testable import TodoApp

class ItemListDataProviderTests: XCTestCase {

  var sut: ItemListDataProvider!
  var controller = ItemListViewController()
  var tableView: UITableView!

  override func setUp() {
    super.setUp()

    sut = ItemListDataProvider()
    sut.itemManager = ItemManager()

    _ = controller.view

    tableView = controller.tableView
    tableView.dataSource = sut
  }

  override func tearDown() {
    super.tearDown()
  }

  func testNumberOfSections_IsTwo() {
    let numberOfSections = tableView.numberOfSections
    XCTAssertEqual(numberOfSections, 2)
  }

  func testNumberRowsInFirstSection_IsToDoCount() {
    sut.itemManager?.addItem(ToDoItem(title: "First"))

    XCTAssertEqual(tableView.numberOfRows(inSection: 0), 1)

    sut.itemManager?.addItem(ToDoItem(title: "Second"))

    tableView.reloadData()

    XCTAssertEqual(tableView.numberOfRows(inSection: 0), 2)
  }

  func testNumberOfRowsInSecondSection_IsDoneCount() {
    sut.itemManager?.addItem(ToDoItem(title: "First"))
    sut.itemManager?.addItem(ToDoItem(title: "Second"))
    sut.itemManager?.checkItemAtIndex(0)

    XCTAssertEqual(tableView.numberOfRows(inSection: 1), 1)

    sut.itemManager?.checkItemAtIndex(0)
    tableView.reloadData()

    XCTAssertEqual(tableView.numberOfRows(inSection: 1), 2)
  }

  func testCellForRow_ReturnsItemCell() {
    sut.itemManager?.addItem(ToDoItem(title: "First"))
    tableView.reloadData()

    let cell = tableView.cellForRow(at: IndexPath(row: 0, section: 0))
    XCTAssertTrue(cell is ItemCell)
  }

  func testCellForRow_DequeuesCell() {
    let mockTableView = MockTableView()

    mockTableView.dataSource = sut
    mockTableView.register(ItemCell.self, forCellReuseIdentifier: "ItemCell")

    sut.itemManager?.addItem(ToDoItem(title: "First"))
    mockTableView.reloadData()

    _ = mockTableView.cellForRow(at: IndexPath(row: 0, section: 0))

    XCTAssertTrue(mockTableView.cellGotDequeued)
  }

  func testConfigCell_GetsCalledInCellForRow() {
    let mockTableView = ItemListDataProviderTests.mockTableViewWithDataSource(sut)

    let toDoItem = ToDoItem(title: "First", itemDescription: "First Description")
    sut.itemManager?.addItem(toDoItem)

    mockTableView.reloadData()

    let cell = mockTableView.cellForRow(at: IndexPath(row: 0, section: 0)) as! MockItemCell
    XCTAssertEqual(cell.toDoItem, toDoItem)
  }

  func testCellInSectionTwo_GetsConfiguredWithDoneItem() {
    let mockTableView = ItemListDataProviderTests.mockTableViewWithDataSource(sut)

    let toDoItem = ToDoItem(title: "First", itemDescription: "First Description")
    sut.itemManager?.addItem(toDoItem)

    let secondToDoItem = ToDoItem(title: "Second", itemDescription: "Second Description")
    sut.itemManager?.addItem(secondToDoItem)

    sut.itemManager?.checkItemAtIndex(1)

    mockTableView.reloadData()

    let cell = mockTableView.cellForRow(at: IndexPath(row: 0, section: 1)) as! MockItemCell
    XCTAssertEqual(cell.toDoItem, secondToDoItem)
  }

  func testDeletionButtonInFirstSection_ShowsTitleCheck() {
    let deleteButtonTitle = tableView.delegate?.tableView!(tableView, titleForDeleteConfirmationButtonForRowAt: IndexPath(row: 0, section: 0))
    XCTAssertEqual(deleteButtonTitle, "Check")
  }

  func testDataSourceAndDelegate_AreNotTheSameObject() {
    XCTAssertTrue(tableView.dataSource is ItemListDataProvider)
    XCTAssertTrue(tableView.delegate is ItemListDataProvider)

    XCTAssertNotEqual(tableView.dataSource as? ItemListDataProvider, tableView.delegate as? ItemListDataProvider)
  }

  func testDeletionButtonInFirstSection_ShowsTitleUncheck() {
    let deleteButtonTitle = tableView.delegate?.tableView!(tableView, titleForDeleteConfirmationButtonForRowAt: IndexPath(row: 0, section: 1))
    XCTAssertEqual(deleteButtonTitle, "Uncheck")
  }

  func testCheckingAnItem_ChecksItInTheItemManager() {
    sut.itemManager?.addItem(ToDoItem(title: "First"))

    tableView.dataSource?.tableView!(tableView, commit: .delete, forRowAt: IndexPath(row: 0, section: 0))

    XCTAssertEqual(sut.itemManager?.toDoCount, 0)
    XCTAssertEqual(sut.itemManager?.doneCount, 1)
    XCTAssertEqual(tableView.numberOfRows(inSection: 0), 0)
    XCTAssertEqual(tableView.numberOfRows(inSection: 1), 1)
  }

  func testUncheckingAnItem_UnchecksItInTheItemManager() {
    sut.itemManager?.addItem(ToDoItem(title: "First"))
    sut.itemManager?.checkItemAtIndex(0)

    tableView.reloadData()

    tableView.dataSource?.tableView!(tableView, commit: .delete, forRowAt: IndexPath(row: 0, section: 1))

    XCTAssertEqual(sut.itemManager?.toDoCount, 1)
    XCTAssertEqual(sut.itemManager?.doneCount, 0)
    XCTAssertEqual(tableView.numberOfRows(inSection: 0), 1)
    XCTAssertEqual(tableView.numberOfRows(inSection: 1), 0)
  }

}

extension ItemListDataProviderTests {

  class func mockTableViewWithDataSource(_ dataSource: UITableViewDataSource) -> MockTableView {
    let mockTableView = MockTableView(frame: CGRect(x: 0, y: 0, width: 320, height: 480), style: .plain)
    mockTableView.dataSource = dataSource
    mockTableView.register(MockItemCell.self, forCellReuseIdentifier: "ItemCell")
    return mockTableView
  }

  class MockTableView: UITableView {

    var cellGotDequeued = false

    override func dequeueReusableCell(withIdentifier identifier: String, for indexPath: IndexPath) -> UITableViewCell {
      cellGotDequeued = true

      return super.dequeueReusableCell(withIdentifier: identifier, for: indexPath)
    }

  }

  class MockItemCell: ItemCell {

    var toDoItem: ToDoItem?

    override func configCellWithItem(_ item: ToDoItem, checked: Bool = false) {
      toDoItem = item
    }

  }

}
