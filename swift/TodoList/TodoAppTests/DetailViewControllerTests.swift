//
//  DetailViewControllerTests.swift
//  TodoApp
//
//  Created by TJ Maynes on 1/2/17.
//  Copyright © 2017 TJ Maynes. All rights reserved.
//

import XCTest
@testable import TodoApp
import CoreLocation

class DetailViewControllerTests: XCTestCase {

  let storyboard = UIStoryboard(name: "DetailView", bundle: nil)
  var sut: DetailViewController!

  override func setUp() {
    super.setUp()

    sut = storyboard.instantiateViewController(withIdentifier: "DetailView") as? DetailViewController
    _ = sut.view
  }

  override func tearDown() {
    super.tearDown()
  }

  func test_HasTitleLabel() {
    XCTAssertNotNil(sut.titleLabel)
  }

  func test_HasDateLabel() {
    XCTAssertNotNil(sut.dateLabel)
  }

  func test_HasLocationLabel() {
    XCTAssertNotNil(sut.locationLabel)
  }

  func test_HasDescriptionLabel() {
    XCTAssertNotNil(sut.descriptionLabel)
  }

  func test_HasMapView() {
    XCTAssertNotNil(sut.mapView)
  }

  func testSettingItemInfo_SetsTextsToLabels() {
    let coordinate = CLLocationCoordinate2D(latitude: 51.2277, longitude: 6.7735)
    let itemManager = ItemManager()
    itemManager.addItem(ToDoItem(title: "The title", itemDescription: "The description", timestamp: 1456150025, location: Location(name: "Home", coordinate: coordinate)))

    sut.itemInfo = (itemManager, 0)

    sut.beginAppearanceTransition(true, animated: true)
    sut.endAppearanceTransition()

    XCTAssertEqual(sut.titleLabel.text, "The title")
    XCTAssertEqual(sut.dateLabel.text, "02/22/2016")
    XCTAssertEqual(sut.locationLabel.text, "Home")
    XCTAssertEqual(sut.descriptionLabel.text, "The description")
    XCTAssertEqual(sut.mapView.centerCoordinate.latitude, coordinate.latitude, accuracy: 0.001)
    XCTAssertEqual(sut.mapView.centerCoordinate.longitude, coordinate.longitude, accuracy: 0.001)
  }

  func testCheckItem_ChecksItemInItemManager() {
    let itemManager = ItemManager()
    itemManager.addItem(ToDoItem(title: "The title"))

    sut.itemInfo = (itemManager, 0)

    sut.checkItem()

    XCTAssertEqual(itemManager.toDoCount, 0)
    XCTAssertEqual(itemManager.doneCount, 1)
  }

}
