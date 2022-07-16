//
//  TMStoreOperation.m
//  Huebly
//
//  Created by TJ Maynes on 9/21/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

#import "TMStoreOperation.h"

@interface TMStoreOperation ()

@property (nonatomic, strong) NSManagedObject *managedObject;

@end

@implementation TMStoreOperation

- (instancetype)initWithManagedObject:(NSManagedObject *)managedObject {
    self = [super init];
    if (self) {
        _managedObject = managedObject;
    }
    return self;
}

- (void)start {
    [super start];

    TMStoreOperation __weak *weakSelf = self;
    [TMDataOperation.privateObjectContext performBlock:^{
        NSError *error = nil;
        if (TMDataOperation.privateObjectContext != nil) {
            if ([TMDataOperation.privateObjectContext hasChanges] && ![TMDataOperation.privateObjectContext save:&error]) {
                NSLog(@"Unresolved error %@, %@", error, [error userInfo]);
                [weakSelf finishedOperation:NO];
            } else {
                [weakSelf performStoreOperation:TMDataOperation.managedObjectContext];
            }
        }
    }];
}

- (void)performStoreOperation:(NSManagedObjectContext *)managedObjectContext {
    TMStoreOperation __weak *weakSelf = self;
    [managedObjectContext performBlock:^{
        NSError *error = nil;
        if (managedObjectContext != nil) {
            if ([managedObjectContext hasChanges] && ![managedObjectContext save:&error]) {
                NSLog(@"Unresolved error %@, %@", error, [error userInfo]);
                [weakSelf finishedOperation:NO];
            } else {
                [weakSelf finishedOperation:YES];
            }
        }
    }];
}

- (void)finishedOperation:(BOOL)success {
    [self finish];

    if (self.completion) {
        self.completion(success);
    }
}

@end
