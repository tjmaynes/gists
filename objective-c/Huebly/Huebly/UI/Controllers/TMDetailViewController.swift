//
//  TMDetailViewController.swift
//  Huebly
//
//  Created by TJ Maynes on 9/24/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

import UIKit

class TMDetailViewController : UIViewController {
    var color : Color

    init(withColor color: Color) {
        self.color = color
        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder aDecoder: NSCoder) {
        self.color = Color.mock()
        super.init(coder: aDecoder)
    }

    override func loadView() {
        let detailView = TMDetailView.init(withColor: self.color)
        self.navigationController!.navigationBar.barTintColor = detailView.selectedColor
        self.title = "Color"

        self.view = detailView
    }
}
