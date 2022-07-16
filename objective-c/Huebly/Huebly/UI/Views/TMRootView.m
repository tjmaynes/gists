//
//  TMMainView.m
//  Huebly
//
//  Created by TJ Maynes on 5/1/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

#import "TMRootView.h"

@implementation TMRootView

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (!self) return nil;

    [self setupView];
    [self setupConstraints];

    return self;
}

- (void)updateConstraints {
    [super updateConstraints];
}

- (UITableView *)tableView {
    if (_tableView == NULL) {
        _tableView = [[UITableView alloc] init];
        [_tableView setAccessibilityIdentifier:@"TableView"];
        [_tableView setIsAccessibilityElement:YES];
        [_tableView setTranslatesAutoresizingMaskIntoConstraints:NO];
    }
    return _tableView;
}

- (void)setupView{
    [self addSubview:self.tableView];
}

- (void)setupConstraints {
    NSDictionary *viewsDictionary = @{@"tableView": self.tableView};

    NSArray *verticalTableViewLayout = [NSLayoutConstraint constraintsWithVisualFormat:@"V:|[tableView]|" options:0 metrics:nil views:viewsDictionary];
    NSArray *horizontialTableViewLayout = [NSLayoutConstraint constraintsWithVisualFormat:@"H:|[tableView]|" options:0 metrics:nil views:viewsDictionary];

    [self addConstraints:verticalTableViewLayout];
    [self addConstraints:horizontialTableViewLayout];
}

@end
