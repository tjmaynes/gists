//
//  TMDependencyInjection.m
//  Huebly
//
//  Created by TJ Maynes on 4/16/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

#import "TMDependencyInjection.h"
#import "TMDataManager.h"

@implementation TMDependencyInjection

+ (instancetype)sharedInstance {
    static TMDependencyInjection *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[self alloc] init];
    });
    return sharedInstance;
}

- (TMPersistenceStack *)persistenceStack {
    static TMPersistenceStack *persistenceStack = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        persistenceStack = [[TMPersistenceStack alloc] init];
    });
    return persistenceStack;
}

- (TMRootViewController *)rootViewController {
    static TMRootViewController *rootViewController = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        rootViewController = [[TMRootViewController alloc] init];
    });
    return rootViewController;
}

@end
