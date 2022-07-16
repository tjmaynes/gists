//
//  ItemCell.swift
//  TodoApp
//
//  Created by TJ Maynes on 12/15/16.
//  Copyright © 2016 TJ Maynes. All rights reserved.
//

import UIKit

protocol ItemCellProtocol {
  func configCellWithItem(_ item: ToDoItem, checked: Bool)
}

class ItemCell: UITableViewCell, ItemCellProtocol {

  var titleLabel = UILabel()
  var locationLabel = UILabel()
  var dateLabel = UILabel()

    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
    super.init(style: style, reuseIdentifier: reuseIdentifier)

    setupUI()
  }

  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  func configCellWithItem(_ item: ToDoItem, checked: Bool = false) {
    if checked {
        let attributedTitle = NSAttributedString(string: item.title, attributes: [NSAttributedString.Key.strikethroughStyle: NSUnderlineStyle.single.rawValue])
      titleLabel.attributedText = attributedTitle
      locationLabel.text = nil
      dateLabel.text = nil
    } else {
      self.titleLabel.text = item.title
      self.locationLabel.text = item.location?.name

      if let timestamp = item.timestamp {
        let date = Date(timeIntervalSince1970: timestamp)
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "MM/dd/yyyy"
        dateFormatter.timeZone = TimeZone(abbreviation: "UTC")

        dateLabel.text = dateFormatter.string(from: date)
      }
    }
  }

  private func setupUI() {
    self.titleLabel.translatesAutoresizingMaskIntoConstraints = false
    self.titleLabel.accessibilityIdentifier = "Title Label"
    self.titleLabel.isAccessibilityElement = true

    self.locationLabel.translatesAutoresizingMaskIntoConstraints = false
    self.locationLabel.accessibilityIdentifier = "Location Label"
    self.locationLabel.isAccessibilityElement = true

    self.dateLabel.translatesAutoresizingMaskIntoConstraints = false
    self.dateLabel.accessibilityIdentifier = "Date Label"
    self.dateLabel.isAccessibilityElement = true
  }

}
