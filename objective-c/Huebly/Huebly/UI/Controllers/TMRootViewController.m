//
//  TMRootViewController.m
//  Huebly
//
//  Created by TJ Maynes on 4/16/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

#import "TMRootViewController.h"
#import "TMAddColorViewController.h"

#import "TMDataManager.h"

#import "Huebly-Swift.h"

static NSString *cellIdentifier = @"HueblyColor";

@interface TMRootViewController ()

@property (strong) NSArray *colors;

@end

@implementation TMRootViewController

- (void)loadView {
    TMRootView *rootView = [[TMRootView alloc] init];
    self.rootView = rootView;
    self.rootView.tableView.delegate = self;
    self.rootView.tableView.dataSource = self;
    [self setView:self.rootView];

    self.title = @"Huebly";

    UIBarButtonItem *addColorButton = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemAdd target:self action:@selector(addNewColor)];
    self.navigationItem.rightBarButtonItem = addColorButton;

    [self.rootView.tableView registerClass:[UITableViewCell class] forCellReuseIdentifier:cellIdentifier];
}

- (void)addNewColor {
    TMAddColorViewModel *addColorViewModel = [[TMAddColorViewModel alloc] init];
    TMAddColorViewController *addColorViewController = [[TMAddColorViewController alloc] initWithViewModel:addColorViewModel];
    [self.navigationController pushViewController:addColorViewController animated:NO];
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];

    [self fetchColors];
}

- (void)fetchColors {
    TMRootViewController __weak *weakSelf = self;
    [TMDataManager fetchColors:^(NSArray *colors) {
        [weakSelf refreshTableWithColors:colors];
    }];
}

- (void)refreshTableWithColors:(NSArray *)colors {
    TMRootViewController __weak *weakSelf = self;
    dispatch_async(dispatch_get_main_queue(), ^{
        if (colors) {
            weakSelf.colors = colors;
        }

        [weakSelf.rootView.tableView reloadData];
    });
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return self.colors.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier forIndexPath:indexPath];
    if (!cell) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellIdentifier];
    }

    Color *color = [self.colors objectAtIndex:indexPath.row];
    NSString *cellTitle = [NSString stringWithFormat:@"HEX: %@", color.rgbHexColor];
    [cell.textLabel setText:cellTitle];

    UIColor *backgroundColor = [UIColor colorWithRed:color.red/255.0 green:color.green/255.0 blue:color.blue/255.0 alpha:color.alpha/1.0];

    cell.textLabel.backgroundColor = backgroundColor;
    cell.contentView.backgroundColor = backgroundColor;
    cell.selectionStyle = UITableViewStylePlain;
    cell.backgroundColor = backgroundColor;
    cell.accessoryView.backgroundColor = backgroundColor;
    for ( UIView* view in cell.contentView.subviews ) {
        view.backgroundColor = backgroundColor;
    }

    return cell;
}

- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath {
    return YES;
}

- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath {
    if (editingStyle == UITableViewCellEditingStyleDelete) {
        NSManagedObject *managedObject = [self.colors objectAtIndex:indexPath.row];
        [TMDataManager deleteColor:managedObject onCompletion:^(BOOL success) {
            if (success) {
                [self fetchColors];
            }
        }];
    }
}

#pragma mark - Table view delegate
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    Color *selectedColor = [self.colors objectAtIndex:indexPath.row];
    TMDetailViewController *detailViewController = [[TMDetailViewController alloc] initWithColor:selectedColor];
    [self.navigationController pushViewController:detailViewController animated:NO];
}

@end
