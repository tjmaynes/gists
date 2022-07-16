//
//  ItemListViewController.swift
//  TodoApp
//
//  Created by TJ Maynes on 10/23/16.
//  Copyright © 2016 TJ Maynes. All rights reserved.
//

import UIKit

class ItemListViewController: UIViewController {

  var tableView = UITableView()
  var dataProvider = ItemListDataProvider()

  override func loadView() {
    tableView.dataSource = dataProvider
    tableView.delegate = dataProvider

    tableView.register(ItemCell.self, forCellReuseIdentifier: "ItemCell")

    super.loadView()
  }

}
