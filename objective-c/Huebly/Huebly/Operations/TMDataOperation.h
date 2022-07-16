//
//  TMDataOperation.h
//  Huebly
//
//  Created by TJ Maynes on 9/24/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

#import "TMOperation.h"
#import "TMDependencyInjection.h"

@interface TMDataOperation : TMOperation

+ (TMPersistenceStack *)persistenceStack;
+ (NSManagedObjectContext *)privateObjectContext;
+ (NSManagedObjectContext *)managedObjectContext;

@end
