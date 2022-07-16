//
//  TMAddColorViewController.m
//  Huebly
//
//  Created by TJ Maynes on 5/28/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

#import "TMAddColorViewController.h"
#import "TMDataManager.h"

@interface TMAddColorViewController ()

@property (nonatomic, strong) TMAddColorViewModel *viewModel;

@end

@implementation TMAddColorViewController

- (instancetype)initWithViewModel:(TMAddColorViewModel *)viewModel {
    self = [super init];
    if (!self) return nil;

    self.title = @"New Color";

    _viewModel = viewModel;

    return self;
}

- (void)loadView {
    TMAddColorView *addColorView = [[TMAddColorView alloc] init];
    self.addColorView = addColorView;
    [self setView:self.addColorView];

    [self.addColorView.redSlider addTarget:self action:@selector(updateRedState:) forControlEvents:UIControlEventValueChanged];
    [self.addColorView.greenSlider addTarget:self action:@selector(updateGreenState:) forControlEvents:UIControlEventValueChanged];
    [self.addColorView.blueSlider addTarget:self action:@selector(updateBlueState:) forControlEvents:UIControlEventValueChanged];
    [self.addColorView.alphaSlider addTarget:self action:@selector(updateAlphaState:) forControlEvents:UIControlEventValueChanged];

    UIBarButtonItem *saveColorButton = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemSave target:self action:@selector(saveColor)];
    self.navigationItem.rightBarButtonItem = saveColorButton;
}

- (void)viewDidLoad {
    [super viewDidLoad];

    [self updateState];
}

- (void)updateRedState:(UISlider *)sender {
    [self.viewModel updateRedState:sender.value];
    [self updateState];
}

- (void)updateBlueState:(UISlider *)sender {
    [self.viewModel updateBlueState:sender.value];
    [self updateState];
}

- (void)updateGreenState:(UISlider *)sender {
    [self.viewModel updateGreenState:sender.value];
    [self updateState];
}

- (void)updateAlphaState:(UISlider *)sender {
    [self.viewModel updateAlphaState:sender.value];
    [self updateState];
}

- (void)saveColor {
    NSDictionary *data = @{@"red": self.viewModel.redString, @"green": self.viewModel.greenString, @"blue": self.viewModel.blueString, @"alpha": self.viewModel.alphaString};

    TMAddColorViewController __weak *weakSelf = self;
    [TMDataManager saveColor:data onCompletion:^(BOOL success) {
        [weakSelf updateStatus:success];
    }];
}

- (void)updateStatus:(BOOL)status {
    TMAddColorViewController __weak *weakSelf = self;
    dispatch_async(dispatch_get_main_queue(), ^{
        [weakSelf.navigationController popViewControllerAnimated:YES];
    });
}

- (void)updateState {
    self.addColorView.redSlider.value = self.viewModel.redValue;
    self.addColorView.greenSlider.value = self.viewModel.greenValue;
    self.addColorView.blueSlider.value = self.viewModel.blueValue;
    self.addColorView.alphaSlider.value = self.viewModel.alphaValue;

    self.addColorView.redLabel.text = self.viewModel.redString;
    self.addColorView.greenLabel.text = self.viewModel.greenString;
    self.addColorView.blueLabel.text = self.viewModel.blueString;
    self.addColorView.alphaLabel.text = self.viewModel.alphaString;

    [self changeBackground];
}

- (void)changeBackground {
    CGFloat red = self.viewModel.redValue/255.0;
    CGFloat blue = self.viewModel.blueValue/255.0;
    CGFloat green = self.viewModel.greenValue/255.0;
    CGFloat alpha = self.viewModel.alphaValue/1.0;

    UIColor *color = [UIColor colorWithRed:red green:green blue:blue alpha:alpha];
    self.navigationController.navigationBar.barTintColor = color;
    self.addColorView.backgroundColor = color;
}

- (void)dealloc {
    self.viewModel = nil;
    self.addColorView = nil;
}

@end
