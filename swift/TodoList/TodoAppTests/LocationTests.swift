//
//  LocationTests.swift
//  TodoApp
//
//  Created by TJ Maynes on 10/23/16.
//  Copyright © 2016 TJ Maynes. All rights reserved.
//

import XCTest
@testable import TodoApp
import CoreLocation

class LocationTests: XCTestCase {

  override func setUp() {
    super.setUp()
  }

  override func tearDown() {
    super.tearDown()
  }

  func testInit_ShouldSetNameAndCoordinate() {
    let testCoordinate = CLLocationCoordinate2D(latitude: 1, longitude: 2)
    let location = Location(name: "", coordinate: testCoordinate)

    XCTAssertEqual(location.coordinate?.latitude, testCoordinate.latitude, "Initializer should set latitude")
    XCTAssertEqual(location.coordinate?.longitude, testCoordinate.longitude, "Initializer should set longitude")
  }

  func testInit_ShouldSetName() {
    let location = Location(name: "Test name")

    XCTAssertEqual(location.name, "Test name", "Initializer should set name")
  }

  func testWhenLatitudeDifferes_ShouldBeNotEqual() {
    performNotEqualTestWithLocationProperties(firstName: "Home", secondName: "Home", firstLongLat: (1.0, 0.0), secondLongLat: (0.0, 0.0))
  }

  func testWhenOneHasCoordinateAndTheOtherDoesnt_ShouldNotBeEqual() {
    performNotEqualTestWithLocationProperties(firstName: "Home", secondName: "Home", firstLongLat: (1.0, 0.0), secondLongLat: nil)
  }

  func testWhenNameDifferes_ShouldNotBeEqual() {
    performNotEqualTestWithLocationProperties(firstName: "Home", secondName: "Office", firstLongLat: nil, secondLongLat: nil)
  }

  func performNotEqualTestWithLocationProperties(firstName: String, secondName: String, firstLongLat: (Double, Double)?, secondLongLat: (Double, Double)?, line: UInt = #line) {
    let firstCoord: CLLocationCoordinate2D?
    if let firstLongLat = firstLongLat {
      firstCoord = CLLocationCoordinate2D(latitude: firstLongLat.0, longitude: firstLongLat.1)
    } else {
      firstCoord = nil
    }

    let firstLocation = Location(name: firstName, coordinate: firstCoord)

    let secondCoord: CLLocationCoordinate2D?
    if let secondLongLat = secondLongLat {
      secondCoord = CLLocationCoordinate2D(latitude: secondLongLat.0, longitude: secondLongLat.1)
    } else {
      secondCoord = nil
    }

    let secondLocation = Location(name: secondName, coordinate: secondCoord)

    XCTAssertNotEqual(firstLocation, secondLocation, line: line)
  }

}
