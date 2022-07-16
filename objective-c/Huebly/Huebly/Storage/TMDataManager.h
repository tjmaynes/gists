//
//  TMDataManager.h
//  Huebly
//
//  Created by TJ Maynes on 4/16/16.
//  Copyright © 2016 tjmaynes. All rights reserved.
//

@import Foundation;

#import "TMStoreOperation.h"

#import "Color.h"

@interface TMDataManager : NSObject

typedef void (^TMSucessTask)(BOOL);
typedef void (^TMQueryTask)(NSArray *);

+ (void)fetchColors:(TMQueryTask)completion;
+ (void)saveColor:(NSDictionary *)data onCompletion:(TMSucessTask)completion;
+ (void)storeData:(NSManagedObject *)managedObject onCompletion:(TMSucessTask)completion;
+ (void)deleteColor:(NSManagedObject *)managedObject onCompletion:(TMSucessTask)completion;

@end
