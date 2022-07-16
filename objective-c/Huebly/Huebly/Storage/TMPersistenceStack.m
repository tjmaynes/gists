//
//  TMPersistenceStack.m
//  Huebly
//
//  Created by TJ Maynes on 4/16/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

#import "TMPersistenceStack.h"

static NSString * const kPersistentStoreName = @"Huebly";
static NSString * const kPersistentStoreFileName = @"Huebly.sqlite";

@interface TMPersistenceStack ()

@property (nonatomic) NSManagedObjectModel *managedObjectModel;
@property (nonatomic) NSPersistentStoreCoordinator *persistentStoreCoordinator;

@end

@implementation TMPersistenceStack

@synthesize managedObjectContext = _managedObjectContext;
@synthesize privateObjectContext = _privateObjectContext;
@synthesize managedObjectModel = _managedObjectModel;
@synthesize persistentStoreCoordinator = _persistentStoreCoordinator;

#pragma mark - Save context

- (BOOL)save:(NSError **)error {
    return [self.managedObjectContext save:error];
}

- (NSManagedObjectContext *)managedObjectContext {
    if (_managedObjectContext == NULL) {
        _managedObjectContext = [[NSManagedObjectContext alloc] initWithConcurrencyType:NSMainQueueConcurrencyType];
        [_managedObjectContext setPersistentStoreCoordinator:self.persistentStoreCoordinator];
    }

    return _managedObjectContext;
}

- (NSManagedObjectContext *)privateObjectContext {
    if (_privateObjectContext == NULL) {
        _privateObjectContext = [[NSManagedObjectContext alloc] initWithConcurrencyType:NSPrivateQueueConcurrencyType];
        [_privateObjectContext setParentContext:self.managedObjectContext];
    }
    return _privateObjectContext;
}

- (NSManagedObjectModel *)managedObjectModel {
    if (_managedObjectModel == nil) {
        NSURL *modelURL = [[NSBundle mainBundle] URLForResource:kPersistentStoreName
                                                  withExtension:@"momd"];
        _managedObjectModel = [[NSManagedObjectModel alloc] initWithContentsOfURL:modelURL];
    }
    return _managedObjectModel;
}

- (NSPersistentStoreCoordinator *)persistentStoreCoordinator {
    if (_persistentStoreCoordinator == nil) {
        _persistentStoreCoordinator = [[NSPersistentStoreCoordinator alloc] initWithManagedObjectModel:self.managedObjectModel];

        NSError *error = nil;

        if (![_persistentStoreCoordinator addPersistentStoreWithType:NSSQLiteStoreType
                                                       configuration:nil
                                                                 URL:[self persistentStoreURL]
                                                             options:[self autoMigrateOptions]
                                                               error:&error])
        {
            NSLog(@"Unresolved error %@, %@", error, [error userInfo]);
            abort();
        }
    }
    return _persistentStoreCoordinator;
}

- (NSDictionary *)autoMigrateOptions {
    return @{ NSMigratePersistentStoresAutomaticallyOption: @YES,
              NSInferMappingModelAutomaticallyOption: @YES };
}

#pragma mark - Application's Documents directory

- (NSURL *)applicationDocumentsDirectory {
    NSArray *urls = [[NSFileManager defaultManager] URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask];
    return [urls lastObject];
}

- (NSURL *)persistentStoreURL {
    return [self.applicationDocumentsDirectory URLByAppendingPathComponent:kPersistentStoreFileName];
}

@end

