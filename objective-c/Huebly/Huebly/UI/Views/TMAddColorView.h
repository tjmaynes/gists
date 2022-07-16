//
//  TMAddColorView.h
//  Huebly
//
//  Created by TJ Maynes on 9/24/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

@import UIKit;

@interface TMAddColorView : UIView

@property (nonatomic, strong) UISlider *redSlider;
@property (nonatomic, strong) UISlider *greenSlider;
@property (nonatomic, strong) UISlider *blueSlider;
@property (nonatomic, strong) UISlider *alphaSlider;

@property (nonatomic, strong) UILabel *redLabel;
@property (nonatomic, strong) UILabel *greenLabel;
@property (nonatomic, strong) UILabel *blueLabel;
@property (nonatomic, strong) UILabel *alphaLabel;

@end
