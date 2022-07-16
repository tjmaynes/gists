//
//  TMAddColorViewController.h
//  Huebly
//
//  Created by TJ Maynes on 5/28/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

@import UIKit;
@import QuartzCore;

#import "TMAddColorViewModel.h"
#import "TMAddColorView.h"

@interface TMAddColorViewController : UIViewController

typedef enum TMStateType : NSUInteger {
    kRedStateType,
    kBlueStateType,
    kGreenStateType,
    kAlphaStateType,
    kBrightnessStateType,
    kRandomStateType
} TMStateType;

@property (nonatomic, weak) TMAddColorView *addColorView;

- (instancetype)initWithViewModel:(TMAddColorViewModel *)viewModel;

@end
