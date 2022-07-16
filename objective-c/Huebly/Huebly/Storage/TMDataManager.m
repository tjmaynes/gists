//
//  TMDataManager.m
//  Huebly
//
//  Created by TJ Maynes on 4/16/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

#import "TMDataManager.h"
#import "Huebly-Swift.h"

@implementation TMDataManager

+ (void)fetchColors:(TMQueryTask)completion {
    TMQueryOperation *queryOperation = [[TMQueryOperation alloc] initWithQuery:@"Color" onCompletion:completion];
    [[NSOperationQueue dataOperationQueue] addOperation:queryOperation];
    queryOperation.completion = completion;
}

+ (void)saveColor:(NSDictionary *)data onCompletion:(TMSucessTask)completion {
    Color *color = [Color convertDictionaryToColor:data];
    [self storeData:color onCompletion:completion];
}

+ (void)storeData:(NSManagedObject *)managedObject onCompletion:(TMSucessTask)completion {
    TMStoreOperation *storeOperation = [[TMStoreOperation alloc] initWithManagedObject:managedObject];
    [[NSOperationQueue dataOperationQueue] addOperation:storeOperation];
    storeOperation.completion = completion;
}

+ (void)deleteColor:(NSManagedObject *)managedObject onCompletion:(TMSucessTask)completion {
    TMDeleteOperation *deleteOperation = [[TMDeleteOperation alloc] initWithManagedObject:managedObject];
    [[NSOperationQueue dataOperationQueue] addOperation:deleteOperation];

    deleteOperation.completionBlock = ^{
        [self storeData:nil onCompletion:completion];
    };
}

@end
