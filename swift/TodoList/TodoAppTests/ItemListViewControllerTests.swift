//
//  ItemListViewControllerTests.swift
//  TodoApp
//
//  Created by TJ Maynes on 10/23/16.
//  Copyright © 2016 TJ Maynes. All rights reserved.
//

import XCTest
@testable import TodoApp

class ItemListViewControllerTests: XCTestCase {

  var sut = ItemListViewController()

  override func setUp() {
    super.setUp()
    _ = sut.view
  }

  override func tearDown() {
    super.tearDown()
  }

  func test_TableViewIsNotNilAfterViewDidLoad() {
    XCTAssertNotNil(sut.tableView)
  }

  func testViewDidLoad_ShouldSetTableViewDataSource() {
    XCTAssertNotNil(sut.tableView.dataSource)
    XCTAssertTrue(sut.tableView.dataSource is ItemListDataProvider)
  }

  func testViewDidLoad_ShouldSetTableViewDelegate() {
    XCTAssertNotNil(sut.tableView.delegate)
    XCTAssertTrue(sut.tableView.delegate is ItemListDataProvider)
  }

  func testViewDidLoad_ShouldSetDelegateAndDataSourceToTheSameObject() {
    XCTAssertEqual(sut.tableView.dataSource as? ItemListDataProvider, sut.tableView.delegate as? ItemListDataProvider)
  }

}
