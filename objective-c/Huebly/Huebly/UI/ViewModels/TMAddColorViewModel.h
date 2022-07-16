//
//  TMAddColorViewModel.h
//  Huebly
//
//  Created by TJ Maynes on 9/24/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

@import UIKit;

@interface TMAddColorViewModel : NSObject

@property (nonatomic, assign) CGFloat redValue, greenValue, blueValue, alphaValue;
@property (nonatomic, copy) NSString *redString, *greenString, *blueString, *alphaString;

- (void)updateRedState:(CGFloat)redValue;
- (void)updateBlueState:(CGFloat)blueValue;
- (void)updateGreenState:(CGFloat)greenValue;
- (void)updateAlphaState:(CGFloat)alphaValue;

@end
