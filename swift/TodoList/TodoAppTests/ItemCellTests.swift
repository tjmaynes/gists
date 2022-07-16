//
//  ItemCellTests.swift
//  TodoApp
//
//  Created by TJ Maynes on 1/2/17.
//  Copyright © 2017 TJ Maynes. All rights reserved.
//

import XCTest
@testable import TodoApp

class ItemCellTests: XCTestCase {

  var controller = ItemListViewController()
  var dataSource = FakeDataSource()
  var tableView: UITableView!

  override func setUp() {
    super.setUp()

    _ = controller.view
    tableView = controller.tableView
    tableView.dataSource = dataSource
  }

  override func tearDown() {
    super.tearDown()
  }

  func testSUT_HasNameLabel() {
    let cell = tableView.dequeueReusableCell(withIdentifier: "ItemCell", for: IndexPath(row: 0, section: 0)) as! ItemCell
    XCTAssertNotNil(cell.titleLabel)
  }

  func testSUT_HasLocationLabel() {
    let cell = tableView.dequeueReusableCell(withIdentifier: "ItemCell", for: IndexPath(row: 0, section: 0)) as! ItemCell
    XCTAssertNotNil(cell.locationLabel)
  }

  func testSUT_HasDateLabel() {
    let cell = tableView.dequeueReusableCell(withIdentifier: "ItemCell", for: IndexPath(row: 0, section: 0)) as! ItemCell
    XCTAssertNotNil(cell.dateLabel)
  }

  func testConfigWithItem_SetsTitle() {
    let cell = tableView.dequeueReusableCell(withIdentifier: "ItemCell", for: IndexPath(row: 0, section: 0)) as! ItemCell
    let item = ToDoItem(title: "First")
    cell.configCellWithItem(item)
    XCTAssertEqual(cell.titleLabel.text, "First")
  }

  func testConfigWithItem_SetsLabelTexts() {
    let cell = tableView.dequeueReusableCell(withIdentifier: "ItemCell", for: IndexPath(row: 0, section: 0)) as! ItemCell
    let location = Location(name: "Home")
    let item = ToDoItem(title: "First", itemDescription: nil, timestamp: 1456150025, location: location)
    cell.configCellWithItem(item)
    XCTAssertEqual(cell.titleLabel.text, "First")
    XCTAssertEqual(cell.locationLabel.text, "Home")
    XCTAssertEqual(cell.dateLabel.text, "02/22/2016")
  }

  func testTitle_ForCheckedTasks_IsStrokeThrough() {
    let cell = tableView.dequeueReusableCell(withIdentifier: "ItemCell", for: IndexPath(row: 0, section: 0)) as! ItemCell
    let location = Location(name: "Home")
    let item = ToDoItem(title: "First", itemDescription: nil, timestamp: 1456150025, location: location)
    cell.configCellWithItem(item, checked: true)

    let attributedString = NSAttributedString(string: "First", attributes: [NSAttributedString.Key.strikethroughStyle: NSUnderlineStyle.single.rawValue])
    XCTAssertEqual(cell.titleLabel.attributedText, attributedString)
    XCTAssertNil(cell.locationLabel.text)
    XCTAssertNil(cell.dateLabel.text)
  }

}

extension ItemCellTests {

  class FakeDataSource: NSObject, UITableViewDataSource {

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
      return 1
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
      return UITableViewCell()
    }

  }

}
