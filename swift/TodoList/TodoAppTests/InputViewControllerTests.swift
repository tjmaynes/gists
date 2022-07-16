//
//  InputViewControllerTests.swift
//  TodoApp
//
//  Created by TJ Maynes on 2/12/17.
//  Copyright © 2017 TJ Maynes. All rights reserved.
//

import XCTest
@testable import TodoApp
import CoreLocation

class InputViewControllerTests: XCTestCase {
    
    let storyboard = UIStoryboard(name: "InputView", bundle: nil)
    var sut: InputViewController!
    
    var placemark: MockPlacemark!
    
    override func setUp() {
        super.setUp()
        
        sut = storyboard.instantiateViewController(withIdentifier: "InputView") as? InputViewController
        _ = sut.view
    }
    
    override func tearDown() {
        super.tearDown()
    }
    
    func test_HasTitleTextField() {
        XCTAssertNotNil(sut.titleTextField)
    }
    
    func test_HasDateTextField() {
        XCTAssertNotNil(sut.dateTextField)
    }
    
    func test_HasAddressTextField() {
        XCTAssertNotNil(sut.addressTextField)
    }
    
    func test_HasLocationTextField() {
        XCTAssertNotNil(sut.locationTextField)
    }
    
    func test_HasDescriptionTextField() {
        XCTAssertNotNil(sut.descriptionTextField)
    }
    
    func test_HasSaveButton() {
        XCTAssertNotNil(sut.saveButton)
    }
    
    func test_HasCancelButton() {
        XCTAssertNotNil(sut.cancelButton)
    }
    
    func testSave_UsesGeocoderToGetCoordinateFromAddress() {
        sut.titleTextField.text = "Test Title"
        sut.dateTextField.text = "02/22/2016"
        sut.locationTextField.text = "Office"
        sut.addressTextField.text = "Infinite Loop 1, Cupertino"
        sut.descriptionTextField.text = "Test Description"
        
        let mockGeocoder = MockGeocoder()
        sut.geocoder = mockGeocoder
        
        sut.itemManager = ItemManager()
        
        sut.save()
        
        placemark = MockPlacemark()
        let coordinate = CLLocationCoordinate2DMake(37.3316851, -122.0300674)
        placemark.mockCoordinate = coordinate
        mockGeocoder.completionHandler?([placemark], nil)
        
        let item = sut.itemManager?.itemAtIndex(0)
        
        let testItem = ToDoItem(title: "Test Title", itemDescription: "Test Description", timestamp: 1456099200, location: Location(name: "Office", coordinate: coordinate))
        
        XCTAssertEqual(item, testItem)
    }
    
    func test_SaveButtonHasSaveAction() {
        let saveButton: UIButton = sut.saveButton
        guard let actions = saveButton.actions(forTarget: sut, forControlEvent: .touchUpInside) else {
            XCTFail()
            return
        }
        
        XCTAssertTrue(actions.contains("save"))
    }
    
    func test_GeocoderWorksAsExpected() {
        let expectationTest = expectation(description: "Wait for geocode")
        
        CLGeocoder().geocodeAddressString("Infinite Loop 1, Cupertino") {
            (placemarks, error) in
            let placemark = placemarks?.first
            let coordinate = placemark?.location?.coordinate
            
            guard let latitude = coordinate?.latitude else {
                XCTFail()
                return
            }
            
            guard let longitude = coordinate?.longitude else {
                XCTFail()
                return
            }
            
            XCTAssertEqual(latitude, 37.331656, accuracy: 0.000001)
            XCTAssertEqual(longitude, -122.0301426, accuracy: 0.000001)
            
            expectationTest.fulfill()
        }
        
        waitForExpectations(timeout: 3, handler: nil)
    }
    
}

extension InputViewControllerTests {
    
    class MockGeocoder: CLGeocoder {
        
        var completionHandler: CLGeocodeCompletionHandler?
        
        override func geocodeAddressString(_ addressString: String, completionHandler: @escaping CLGeocodeCompletionHandler) {
            self.completionHandler = completionHandler
        }
        
    }
    
    class MockPlacemark: CLPlacemark {
        
        var mockCoordinate: CLLocationCoordinate2D?
        
        override var location: CLLocation? {
            guard let coordinate = mockCoordinate else { return CLLocation() }
            return CLLocation(latitude: coordinate.latitude, longitude: coordinate.longitude)
        }
        
    }
    
}
