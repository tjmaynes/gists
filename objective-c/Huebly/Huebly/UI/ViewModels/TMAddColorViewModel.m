//
//  TMAddColorViewModel.m
//  Huebly
//
//  Created by TJ Maynes on 9/24/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

#import "TMAddColorViewModel.h"

@implementation TMAddColorViewModel

- (instancetype)init {
    self = [super init];
    if (self) {
        [self randomizeState];
    }
    return self;
}

- (void)randomizeState {
    [self updateRedState:arc4random() % 255];
    [self updateGreenState:arc4random() % 255];
    [self updateBlueState:arc4random() % 255];
    [self updateAlphaState:1.0];
}

- (void)updateRedState:(CGFloat)redValue {
    self.redValue = redValue;
    self.redString = [NSString stringWithFormat:@"%.1f", redValue];
}

- (void)updateBlueState:(CGFloat)blueValue {
    self.blueValue = blueValue;
    self.blueString = [NSString stringWithFormat:@"%.1f", blueValue];
}

- (void)updateGreenState:(CGFloat)greenValue {
    self.greenValue = greenValue;
    self.greenString = [NSString stringWithFormat:@"%.1f", greenValue];
}

- (void)updateAlphaState:(CGFloat)alphaValue {
    self.alphaValue = alphaValue;
    self.alphaString = [NSString stringWithFormat:@"%f", alphaValue];
}

@end
