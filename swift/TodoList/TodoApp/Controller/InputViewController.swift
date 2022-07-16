//
//  InputViewController.swift
//  TodoApp
//
//  Created by TJ Maynes on 2/12/17.
//  Copyright © 2017 TJ Maynes. All rights reserved.
//

import UIKit
import CoreLocation

class InputViewController: UIViewController {

  @IBOutlet weak var titleTextField: UITextField!
  @IBOutlet weak var dateTextField: UITextField!
  @IBOutlet weak var addressTextField: UITextField!
  @IBOutlet weak var locationTextField: UITextField!
  @IBOutlet weak var descriptionTextField: UITextField!

  @IBOutlet weak var saveButton: UIButton!
  @IBOutlet weak var cancelButton: UIButton!

  lazy var geocoder = CLGeocoder()
  var itemManager: ItemManager?

  let dateFormatter: DateFormatter = {
    let dateFormatter = DateFormatter()
    dateFormatter.dateFormat = "MM/dd/yyyy"
    dateFormatter.timeZone = TimeZone(abbreviation: "UTC")
    return dateFormatter
  }()

  @IBAction func save() {
    guard let titleText = self.titleTextField.text, titleText.count > 0 else { return }

    let date: Date?
    if let dateText = self.dateTextField.text, dateText.count > 0 {
      date = dateFormatter.date(from: dateText)
    } else {
      date = nil
    }

    guard let descriptionText = self.descriptionTextField.text, descriptionText.count > 0 else { return }

    if let locationName = self.locationTextField.text, locationName.count > 0 {
      if let address = self.addressTextField.text, address.count > 0 {
        geocoder.geocodeAddressString(address, completionHandler: { [unowned self] (placeMarks, error) in
          let placeMark = placeMarks?.first

          let item = ToDoItem(title: titleText, itemDescription: descriptionText, timestamp: date?.timeIntervalSince1970, location: Location(name: locationName, coordinate: placeMark?.location?.coordinate))

          self.itemManager?.addItem(item)
        })
      }
    }
  }

}
