//
//  ItemManager.swift
//  TodoApp
//
//  Created by TJ Maynes on 10/23/16.
//  Copyright © 2016 TJ Maynes. All rights reserved.
//

import Foundation

class ItemManager {

  var toDoCount: Int { return toDoItems.count }
  var doneCount: Int { return doneItems.count }
  fileprivate var toDoItems = [ToDoItem]()
  fileprivate var doneItems = [ToDoItem]()

  func addItem(_ item: ToDoItem) {
    if !toDoItems.contains(item) {
      toDoItems.append(item)
    }
  }

  func checkItemAtIndex(_ index: Int) {
    let item = toDoItems.remove(at: index)
    doneItems.append(item)
  }

  func uncheckItemAtIndex(_ index: Int) {
    let item = doneItems.remove(at: index)
    toDoItems.append(item)
  }

  func itemAtIndex(_ index: Int) -> ToDoItem {
    return toDoItems[index]
  }

  func doneItemAtIndex(_ index: Int) -> ToDoItem {
    return doneItems[index]
  }

  func removeAllItems() {
    toDoItems.removeAll()
    doneItems.removeAll()
  }

}
