//
//  TMDependencyInjection.h
//  Huebly
//
//  Created by TJ Maynes on 4/16/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

@import Foundation;

#import "TMPersistenceStack.h"
#import "TMRootViewController.h"

@interface TMDependencyInjection : NSObject

+ (instancetype)sharedInstance;

- (TMPersistenceStack *)persistenceStack;
- (TMRootViewController *)rootViewController;

@end
