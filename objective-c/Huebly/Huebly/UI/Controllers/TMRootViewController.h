//
//  TMRootViewController.h
//  Huebly
//
//  Created by TJ Maynes on 4/16/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

@import UIKit;

#import "TMRootView.h"

@interface TMRootViewController : UIViewController <UITableViewDataSource, UITableViewDelegate>

@property (nonatomic, weak) TMRootView *rootView;

@end
