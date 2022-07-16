//
//  TMAddColorView.m
//  Huebly
//
//  Created by TJ Maynes on 9/24/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

#import "TMAddColorView.h"

@implementation TMAddColorView

@synthesize redSlider, greenSlider, blueSlider, alphaSlider;
@synthesize redLabel, greenLabel, blueLabel, alphaLabel;

- (instancetype)init {
    self = [super init];
    if (self) {
        [self updateView];
    }
    return self;
}

#pragma Setup Sliders

- (UISlider *)redSlider {
    if (redSlider == NULL) {
        redSlider = [[UISlider alloc] init];
        redSlider.minimumValue = 0.0;
        redSlider.maximumValue = 255.0;
        [self setupDefaults:redSlider message:@"Red Slider"];
    }
    return redSlider;
}

- (UISlider *)greenSlider {
    if (greenSlider == NULL) {
        greenSlider = [[UISlider alloc] init];
        greenSlider.minimumValue = 0.0;
        greenSlider.maximumValue = 255.0;
        [self setupDefaults:greenLabel message:@"Green Slider"];
    }
    return greenSlider;
}

- (UISlider *)blueSlider {
    if (blueSlider == NULL) {
        blueSlider = [[UISlider alloc] init];
        blueSlider.minimumValue = 0.0;
        blueSlider.maximumValue = 255.0;
        [self setupDefaults:blueSlider message:@"Blue Slider"];
    }
    return blueSlider;
}

- (UISlider *)alphaSlider {
    if (alphaSlider == NULL) {
        alphaSlider = [[UISlider alloc] init];
        alphaSlider.minimumValue = 0.0;
        alphaSlider.maximumValue = 1.0;
        [self setupDefaults:alphaSlider message:@"Alpha Slider"];
    }
    return alphaSlider;
}

#pragma Setup Labels

- (UILabel *)redLabel {
    if (redLabel == NULL) {
        redLabel = [[UILabel alloc] init];
        redLabel.text = @"Red";
        [self setupDefaults:redLabel message:@"Red Label"];
    }
    return redLabel;
}

- (UILabel *)greenLabel {
    if (greenLabel == NULL) {
        greenLabel = [[UILabel alloc] init];
        greenLabel.text = @"Green";
        [self setupDefaults:greenLabel message:@"Green Label"];
    }
    return greenLabel;
}

- (UILabel *)blueLabel {
    if (blueLabel == NULL) {
        blueLabel = [[UILabel alloc] init];
        blueLabel.text = @"Blue";
        [self setupDefaults:blueLabel message:@"Blue Label"];
    }
    return blueLabel;
}

- (UILabel *)alphaLabel {
    if (alphaLabel == NULL) {
        alphaLabel = [[UILabel alloc] init];
        alphaLabel.text = @"Alpha";
        [self setupDefaults:alphaLabel message:@"Alpha Label"];
    }
    return alphaLabel;
}

- (void)updateView {
    UIStackView *redStackView = [self buildRedStackView];
    UIStackView *greenStackView = [self buildGreenStackView];
    UIStackView *blueStackView = [self buildBlueStackView];
    UIStackView *alphaStackView = [self buildAlphaStackView];

    NSArray *stackViews = @[redStackView, greenStackView, blueStackView, alphaStackView];
    UIStackView *stackView = [[UIStackView alloc] initWithArrangedSubviews:stackViews];
    [self setupDefaults:stackView message:@"Alpha Stack View"];
    [self updateStackView:stackView];

    [self addSubview:stackView];

    NSDictionary *viewsDictionary = @{@"stackView": stackView};
    NSArray *contentVerticalConstraints = [NSLayoutConstraint constraintsWithVisualFormat:@"V:|[stackView]|" options:0 metrics:nil views:viewsDictionary];
    NSArray *contentHorizontalConstraints = [NSLayoutConstraint constraintsWithVisualFormat:@"H:|[stackView]|" options:0 metrics:nil views:viewsDictionary];

    [self addConstraints:contentVerticalConstraints];
    [self addConstraints:contentHorizontalConstraints];
}

- (UIStackView *)buildRedStackView {
    UIStackView *redStackView = [self defaultStackView];
    [redStackView addArrangedSubview:self.redLabel];
    [redStackView addArrangedSubview:self.redSlider];
    [self setupDefaults:redStackView message:@"Red Stack View"];

    return redStackView;
}

- (UIStackView *)buildGreenStackView {
    UIStackView *greenStackView = [self defaultStackView];
    [greenStackView addArrangedSubview:self.greenLabel];
    [greenStackView addArrangedSubview:self.greenSlider];
    [self setupDefaults:greenStackView message:@"Green Stack View"];

    return greenStackView;
}

- (UIStackView *)buildBlueStackView {
    UIStackView *blueStackView = [self defaultStackView];
    [blueStackView addArrangedSubview:self.blueLabel];
    [blueStackView addArrangedSubview:self.blueSlider];
    [self setupDefaults:blueStackView message:@"Blue Stack View"];

    return blueStackView;
}

- (UIStackView *)buildAlphaStackView {
    UIStackView *alphaStackView = [self defaultStackView];
    [alphaStackView addArrangedSubview:self.alphaLabel];
    [alphaStackView addArrangedSubview:self.alphaSlider];
    [self setupDefaults:alphaStackView message:@"Alpha Stack View"];

    return alphaStackView;
}

- (UIStackView *)defaultStackView {
    UIStackView *defaultStackView = [[UIStackView alloc] init];
    [self updateStackView:defaultStackView];

    return defaultStackView;
}

- (void)setupDefaults:(id)view message:(NSString *)message {
    [view setAccessibilityIdentifier:message];
    [view setIsAccessibilityElement:YES];
    [view setTranslatesAutoresizingMaskIntoConstraints:NO];
}

- (void)updateStackView:(UIStackView *)stackView {
    stackView.axis = UILayoutConstraintAxisVertical;
    stackView.distribution = UIStackViewDistributionFillEqually;
    stackView.alignment = UIStackViewAlignmentFill;
    stackView.spacing = 5;
}

@end
