//
//  TMStoreOperation.h
//  Huebly
//
//  Created by TJ Maynes on 9/21/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

#import "TMDataOperation.h"

@interface TMStoreOperation : TMDataOperation

typedef void (^TMStoreOperationCompletionBlock)(BOOL);

@property (nonatomic, copy) TMStoreOperationCompletionBlock completion;

- (instancetype)initWithManagedObject:(NSManagedObject *)managedObject;

@end
