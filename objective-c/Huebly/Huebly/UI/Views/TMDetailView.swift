//
//  TMDetailView.swift
//  Huebly
//
//  Created by TJ Maynes on 9/24/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

import UIKit

@objc public class TMDetailView : UIView {
    var color : Color?
    var tableView : UITableView?

    public var selectedColor: UIColor {
        let red : CGFloat = CGFloat(self.color!.red)/255.0
        let green : CGFloat = CGFloat(self.color!.green)/255.0
        let blue : CGFloat = CGFloat(self.color!.blue)/255.0
        let alpha : CGFloat = CGFloat(self.color!.alpha)/255.0
        return UIColor.init(red: red, green: green, blue: blue, alpha: alpha)
    }

    public func buildTableView() -> UITableView {
        let tableView : UITableView = UITableView.init()
        tableView.translatesAutoresizingMaskIntoConstraints = false
        tableView.accessibilityIdentifier = "Detail Table View"
        tableView.isAccessibilityElement = true
        return tableView
    }

    init(withColor color: Color) {
        super.init(frame: CGRect.zero)

        self.color = color
        self.tableView = buildTableView()

        self.backgroundColor = selectedColor;

        setupView()
    }
    
    required public init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
/*
    override func tableView(tableView: UITableView, willDisplayCell cell: UITableViewCell, forRowAtIndexPath indexPath: NSIndexPath) {
        cell.backgroundColor = UIColor.clear
    }*/

    private func setupView() {
        self.addSubview(self.tableView!)

        let viewsDictionary = ["tableView": self.tableView!];
        let tableViewHorizontalConstraints = NSLayoutConstraint.constraints(withVisualFormat:"H:|[tableView]|", options: NSLayoutFormatOptions(rawValue: 0), metrics: nil, views: viewsDictionary)
        let tableViewVerticalConstraints = NSLayoutConstraint.constraints(withVisualFormat:"V:|[tableView]|", options: NSLayoutFormatOptions(rawValue:0), metrics: nil, views: viewsDictionary)

        self.addConstraints(tableViewHorizontalConstraints)
        self.addConstraints(tableViewVerticalConstraints)
    }
}
