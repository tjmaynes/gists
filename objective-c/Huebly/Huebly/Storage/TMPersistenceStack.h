//
//  TMPersistenceStack.h
//  Huebly
//
//  Created by TJ Maynes on 4/16/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

@import Foundation;
@import CoreData;

@interface TMPersistenceStack : NSObject

@property (nonatomic, readonly) NSManagedObjectContext *managedObjectContext;
@property (nonatomic, readonly) NSManagedObjectContext *privateObjectContext;

- (BOOL)save:(NSError **)error;

@end
