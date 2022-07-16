//
//  TMDataOperation.m
//  Huebly
//
//  Created by TJ Maynes on 9/24/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

#import "TMDataOperation.h"

@implementation TMDataOperation

+ (TMPersistenceStack *)persistenceStack {
    return [[TMDependencyInjection sharedInstance] persistenceStack];
}

+ (NSManagedObjectContext *)privateObjectContext {
    return [self.persistenceStack privateObjectContext];
}

+ (NSManagedObjectContext *)managedObjectContext {
    return [self.persistenceStack managedObjectContext];
}

@end
